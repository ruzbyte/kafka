"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useAuthStore } from "@/hooks/auth_hook";
import { useEffect, useState } from "react";
import { getUserSubjects } from "@/lib/subjects";
import type { UserSubject } from "@/types/subjects";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  FileText, 
  Upload, 
  Trash2, 
  File as FileIcon, 
  Save, 
  Loader2,
  ChevronRight,
  Plus,
  ArrowLeft,
  Eye,
  Edit2,
  MoreVertical,
  Search
} from "lucide-react";
import { 
  getSubjectNotes, 
  createSubjectNote, 
  updateSubjectNote, 
  deleteSubjectNote,
  getSubjectFiles, 
  uploadSubjectFile, 
  deleteSubjectFile 
} from "@/lib/notes";
import type { SubjectNote, SubjectFile } from "@/types/types";
import { toast } from "sonner";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function NotesPage() {
  const { user } = useAuthStore();
  const [subjects, setSubjects] = useState<UserSubject[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<UserSubject | null>(null);
  
  // View states
  const [activeNote, setActiveNote] = useState<SubjectNote | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  
  // Data states
  const [notes, setNotes] = useState<SubjectNote[]>([]);
  const [files, setFiles] = useState<SubjectFile[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Loading states
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load subjects on mount
  useEffect(() => {
    if (user?.uid) {
      getUserSubjects(user.uid).then((data) => {
        setSubjects(data);
        setIsLoading(false);
      });
    }
  }, [user?.uid]);

  // Load notes and files when subject changes
  useEffect(() => {
    if (user?.uid && selectedSubject) {
      setIsLoading(true);
      Promise.all([
        getSubjectNotes(user.uid, selectedSubject.id.toString()),
        getSubjectFiles(user.uid, selectedSubject.id.toString())
      ]).then(([notesData, filesData]) => {
        setNotes(notesData);
        setFiles(filesData);
        setActiveNote(null);
        setIsEditing(false);
        setIsLoading(false);
      });
    }
  }, [user?.uid, selectedSubject]);

  const handleCreateNote = async () => {
    if (!user?.uid || !selectedSubject) return;
    const title = prompt("Enter note title:");
    if (!title) return;

    try {
      const newNote = await createSubjectNote(user.uid, selectedSubject.id.toString(), title);
      setNotes([newNote, ...notes]);
      setActiveNote(newNote);
      setIsEditing(true);
      setIsPreview(false);
    } catch (error) {
      toast.error("Failed to create note");
    }
  };

  const handleSaveNote = async () => {
    if (!user?.uid || !selectedSubject || !activeNote) return;
    setIsSaving(true);
    try {
      await updateSubjectNote(user.uid, selectedSubject.id.toString(), activeNote.id, {
        content: activeNote.content,
        title: activeNote.title
      });
      setNotes(notes.map(n => n.id === activeNote.id ? activeNote : n));
      setIsEditing(false);
      toast.success("Note saved");
    } catch (error) {
      toast.error("Failed to save note");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteNote = async (e: React.MouseEvent, noteId: string) => {
    e.stopPropagation();
    if (!user?.uid || !selectedSubject) return;
    if (!confirm("Are you sure you want to delete this note?")) return;

    try {
      await deleteSubjectNote(user.uid, selectedSubject.id.toString(), noteId);
      setNotes(notes.filter(n => n.id !== noteId));
      if (activeNote?.id === noteId) {
        setActiveNote(null);
        setIsEditing(false);
      }
      toast.success("Note deleted");
    } catch (error) {
      toast.error("Failed to delete note");
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user?.uid || !selectedSubject) return;

    if (file.type !== "application/pdf") {
      toast.error("Only PDF files are allowed");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error("File size must be less than 10MB");
      return;
    }

    setIsUploading(true);
    try {
      const newFile = await uploadSubjectFile(user.uid, selectedSubject.id.toString(), file);
      setFiles([newFile, ...files]);
      toast.success("File uploaded successfully");
    } catch (error) {
      toast.error("Failed to upload file");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteFile = async (e: React.MouseEvent, fileId: string, fileName: string) => {
    e.stopPropagation();
    if (!user?.uid || !selectedSubject) return;
    if (!confirm("Are you sure you want to delete this file?")) return;

    try {
      await deleteSubjectFile(user.uid, selectedSubject.id.toString(), fileId, fileName);
      setFiles(files.filter(f => f.id !== fileId));
      toast.success("File deleted");
    } catch (error) {
      toast.error("Failed to delete file");
    }
  };

  const filteredItems = [
    ...notes.map(n => ({ ...n, itemType: 'note' as const })),
    ...files.map(f => ({ ...f, itemType: 'file' as const, title: f.name }))
  ].filter(item => {
    const title = item.title || "";
    return title.toLowerCase().includes(searchQuery.toLowerCase());
  }).sort((a, b) => {
    const dateA = new Date((a as any).updatedAt || (a as any).createdAt || 0).getTime();
    const dateB = new Date((b as any).updatedAt || (b as any).createdAt || 0).getTime();
    return dateB - dateA;
  });

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4 w-full">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb className="flex-1">
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Notes</BreadcrumbPage>
              </BreadcrumbItem>
              {selectedSubject && (
                <>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{selectedSubject.name}</BreadcrumbPage>
                  </BreadcrumbItem>
                </>
              )}
            </BreadcrumbList>
          </Breadcrumb>
          
          {selectedSubject && !activeNote && (
            <div className="flex items-center gap-2 ml-auto">
              <label className="cursor-pointer">
                <Input type="file" accept=".pdf" className="hidden" onChange={handleFileUpload} disabled={isUploading} />
                <Button variant="outline" size="sm" asChild disabled={isUploading}>
                  <span>
                    {isUploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}
                    Add PDF
                  </span>
                </Button>
              </label>
              <Button size="sm" onClick={handleCreateNote}>
                <Plus className="mr-2 h-4 w-4" />
                Create Note
              </Button>
            </div>
          )}
        </div>
      </header>

      <div className="flex flex-1 gap-0 p-0 min-h-0 overflow-hidden">
        {/* Subjects Sidebar */}
        <div className="w-64 flex flex-col gap-2 shrink-0 overflow-y-auto p-4 border-r bg-gray-50/50 dark:bg-gray-900/20">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Subjects</h2>
          {isLoading && subjects.length === 0 ? (
            <div className="flex justify-center p-4"><Loader2 className="animate-spin h-4 w-4" /></div>
          ) : (
            subjects.map((s) => (
              <button
                key={s.id}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                  selectedSubject?.id === s.id 
                    ? "bg-white dark:bg-gray-800 shadow-sm font-medium border border-gray-200 dark:border-gray-700" 
                    : "hover:bg-gray-100 dark:hover:bg-gray-800 text-muted-foreground"
                }`}
                onClick={() => setSelectedSubject(s)}
              >
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: s.backColor || "#ccc" }} />
                <span className="truncate">{s.name}</span>
              </button>
            ))
          )}
        </div>

        {/* Main Workspace */}
        <div className="flex-1 flex flex-col min-h-0 bg-white dark:bg-black">
          {!selectedSubject ? (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground gap-4">
              <div className="p-4 rounded-full bg-gray-50 dark:bg-gray-900">
                <FileText className="h-12 w-12 opacity-20" />
              </div>
              <p className="text-sm">Select a subject to view notes and files</p>
            </div>
          ) : activeNote ? (
            /* Note Editor/Preview View */
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="icon" onClick={() => setActiveNote(null)}>
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <div>
                    <h2 className="text-lg font-bold leading-none">{activeNote.title}</h2>
                    <p className="text-xs text-muted-foreground mt-1">
                      Last updated: {new Date(activeNote.updatedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1 mr-2">
                    <Button 
                      variant={!isPreview ? "secondary" : "ghost"} 
                      size="sm" 
                      onClick={() => setIsPreview(false)}
                      className="h-7 px-3 text-xs"
                    >
                      <Edit2 className="h-3 w-3 mr-1" /> Edit
                    </Button>
                    <Button 
                      variant={isPreview ? "secondary" : "ghost"} 
                      size="sm" 
                      onClick={() => setIsPreview(true)}
                      className="h-7 px-3 text-xs"
                    >
                      <Eye className="h-3 w-3 mr-1" /> Preview
                    </Button>
                  </div>
                  <Button size="sm" onClick={handleSaveNote} disabled={isSaving}>
                    {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                    Save
                  </Button>
                </div>
              </div>
              
              <div className="flex-1 overflow-hidden flex">
                {!isPreview ? (
                  <Textarea
                    className="flex-1 border-0 rounded-none focus-visible:ring-0 p-8 font-mono text-base resize-none bg-transparent"
                    placeholder="Start writing..."
                    value={activeNote.content}
                    onChange={(e) => setActiveNote({...activeNote, content: e.target.value})}
                  />
                ) : (
                  <div className="flex-1 overflow-y-auto p-8 prose dark:prose-invert max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {activeNote.content || "*No content yet. Click Edit to add some notes.*"}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Directory View */
            <div className="flex flex-col h-full">
              <div className="p-6 border-b">
                <h1 className="text-3xl font-bold mb-1">{selectedSubject.longName}</h1>
                <p className="text-muted-foreground mb-6">{selectedSubject.name}</p>
                
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search notes and files..." 
                    className="pl-10 bg-gray-50 dark:bg-gray-900 border-0"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredItems.length === 0 ? (
                    <div className="col-span-full flex flex-col items-center justify-center py-12 text-muted-foreground border-2 border-dashed rounded-xl">
                      <FileText className="h-8 w-8 mb-2 opacity-20" />
                      <p className="text-sm">No items found.</p>
                    </div>
                  ) : (
                    filteredItems.map((item) => (
                      <Card 
                        key={item.id} 
                        className="group cursor-pointer hover:border-primary/50 transition-all hover:shadow-sm"
                        onClick={() => {
                          if (item.itemType === 'note') {
                            setActiveNote(item as SubjectNote);
                            setIsPreview(true);
                          } else {
                            window.open((item as SubjectFile).url, '_blank');
                          }
                        }}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div className={`p-2 rounded-lg ${item.itemType === 'note' ? 'bg-blue-50 text-blue-600' : 'bg-red-50 text-red-600'}`}>
                              {item.itemType === 'note' ? <FileText className="h-5 w-5" /> : <FileIcon className="h-5 w-5" />}
                            </div>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={(e) => item.itemType === 'note' ? handleDeleteNote(e, item.id) : handleDeleteFile(e, item.id, item.name)}
                            >
                              <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                            </Button>
                          </div>
                          <h3 className="font-semibold truncate pr-8">{item.title}</h3>
                          <p className="text-[10px] text-muted-foreground mt-1 uppercase tracking-wider">
                            {item.itemType} • {new Date((item as any).updatedAt || (item as any).createdAt).toLocaleDateString()}
                          </p>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <style jsx global>{`
        .prose h1 { font-size: 2.25rem; font-weight: 800; margin-bottom: 1.5rem; }
        .prose h2 { font-size: 1.5rem; font-weight: 700; margin-top: 2rem; margin-bottom: 1rem; border-bottom: 1px solid #eee; padding-bottom: 0.5rem; }
        .prose h3 { font-size: 1.25rem; font-weight: 600; margin-top: 1.5rem; }
        .prose p { margin-bottom: 1.25rem; line-height: 1.75; }
        .prose ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1.25rem; }
        .prose li { margin-bottom: 0.5rem; }
        .prose code { background: #f1f5f9; padding: 0.2rem 0.4rem; rounded: 0.25rem; font-size: 0.875em; }
        .dark .prose code { background: #1e293b; }
        .prose pre { background: #1e293b; color: white; padding: 1rem; border-radius: 0.5rem; overflow-x: auto; margin-bottom: 1.25rem; }
        .prose blockquote { border-left: 4px solid #e2e8f0; padding-left: 1rem; italic; color: #64748b; }
      `}</style>
    </>
  );
}
