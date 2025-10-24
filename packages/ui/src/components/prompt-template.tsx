import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";
import { Button } from "./button";
import { cn } from "../lib/utils";

export interface PromptTemplate {
  id: string;
  title: string;
  description: string;
  category: string;
  template: string;
  variables?: string[];
}

export interface PromptTemplateCardProps {
  template: PromptTemplate;
  onSelect?: (template: PromptTemplate) => void;
  className?: string;
}

export const PromptTemplateCard = React.forwardRef<HTMLDivElement, PromptTemplateCardProps>(
  ({ template, onSelect, className }, ref) => {
    return (
      <Card ref={ref} className={cn("hover:border-primary transition-colors cursor-pointer", className)}>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-lg">{template.title}</CardTitle>
              <CardDescription className="mt-1">{template.description}</CardDescription>
            </div>
            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
              {template.category}
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{template.template}</p>
          <Button size="sm" onClick={() => onSelect?.(template)}>
            Use Template
          </Button>
        </CardContent>
      </Card>
    );
  }
);
PromptTemplateCard.displayName = "PromptTemplateCard";
