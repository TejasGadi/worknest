"use client";
import * as Y from "yjs";
import Markdown from 'react-markdown';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { FormEvent, useState, useTransition } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { assert } from "console";
import { BotIcon, LanguagesIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

type Language =
  | "english"
  | "spanish"
  | "portuguese"
  | "french"
  | "german"
  | "chinese"
  | "arabic"
  | "hindi"
  | "russian"
  | "japanese";

const languages: Language[] = [
  "english",
  "spanish",
  "portuguese",
  "french",
  "german",
  "chinese",
  "arabic",
  "hindi",
  "russian",
  "japanese",
];

const TranslateDocument = ({ doc }: { doc: Y.Doc }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [language, setLanguage] = useState<string>("");
  const [summary, setSummary] = useState("");

  const handleAskQuestion = (e: FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const documentData = doc.get("document-store").toJSON();
      console.log("Documents", JSON.stringify(documentData));
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/translateDocument`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            documentData: documentData,
            targetLang: language,
          }),
        }
      );

      if (res.ok) {
        const { translatedText } = await res.json();

        setSummary(translatedText);
        console.log("summary", translatedText)
        toast.success("Translated summary Successfully");
      } else {
        toast.error("Translated summary Failed ");
      }
    });
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button asChild variant="outline" color="#ffff">
        <DialogTrigger>
          <LanguagesIcon />
          Translate
        </DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Translate the document</DialogTitle>
          <DialogDescription>
            Select the Language and AI will summarize for you.
          </DialogDescription>
        </DialogHeader>
        {summary && (
          <div className="flex flex-col items-start max-h-96 overflow-y-scroll gap-2 p-5bg-gray-100">
            <div className="flex">
              <BotIcon className="w-10 flex-shrink-0" />
              <p className="font-bold">
                GPT {isPending ? "is thinking..." : "Says:"}
              </p>
            </div>
            <div>{isPending ? "Thinking..." : <Markdown>{summary}</Markdown>}</div>
          </div>
        )}
        <div>
          <form
            className=" flex flex-col justify-between gap-2"
            onSubmit={handleAskQuestion}
          >
            <Select
              value={language}
              defaultValue="english"
              onValueChange={(value) => setLanguage(value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="select a language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((language) => (
                  <SelectItem key={language} value={language}>
                    {language.charAt(0).toUpperCase() + language.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button type="submit" disabled={isPending} color="#0000">
              {isPending ? "Translating..." : "Translate"}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TranslateDocument;