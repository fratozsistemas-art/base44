import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function QuickActionCard({ 
  action, 
  title, 
  description, 
  roleColor = "blue", 
  themeColor = "blue" 
}) {
  const navigate = useNavigate();
  const displayColor = themeColor || roleColor;

  // Support both action object and direct props
  const displayTitle = title || action?.title || "Quick Action";
  const displayDescription = description || action?.description;
  const displayAction = action || { title: displayTitle, description: displayDescription };

  const colorClasses = {
    blue: { bg: "from-blue-500/20 to-cyan-500/20", border: "border-blue-500/30", text: "text-blue-400" },
    green: { bg: "from-green-500/20 to-emerald-500/20", border: "border-green-500/30", text: "text-green-400" },
    purple: { bg: "from-purple-500/20 to-pink-500/20", border: "border-purple-500/30", text: "text-purple-400" },
    red: { bg: "from-red-500/20 to-orange-500/20", border: "border-red-500/30", text: "text-red-400" },
    pink: { bg: "from-pink-500/20 to-rose-500/20", border: "border-pink-500/30", text: "text-pink-400" },
    orange: { bg: "from-orange-500/20 to-amber-500/20", border: "border-orange-500/30", text: "text-orange-400" },
    cyan: { bg: "from-cyan-500/20 to-blue-500/20", border: "border-cyan-500/30", text: "text-cyan-400" },
    indigo: { bg: "from-indigo-500/20 to-purple-500/20", border: "border-indigo-500/30", text: "text-indigo-400" },
    slate: { bg: "from-slate-500/20 to-slate-600/20", border: "border-slate-500/30", text: "text-slate-400" }
  };

  const colors = colorClasses[displayColor] || colorClasses.blue;

  const handleActivate = () => {
    if (displayTitle.includes("Strategic Intelligence Unit")) {
      navigate(createPageUrl("StrategicIntelligence"));
    } else {
      navigate(createPageUrl("Chat"), {
        state: { quickAction: displayAction }
      });
    }
  };

  return (
    <Card 
      className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 focus-within:ring-offset-slate-900"
      role="article"
      aria-labelledby={`action-title-${action?.title?.replace(/\s+/g, '-').toLowerCase() || 'default'}`}
    >
      <CardHeader className="border-b border-white/10">
        <div className="flex justify-between items-start mb-2">
          <CardTitle className="text-white text-lg leading-tight">
            {displayTitle}
          </CardTitle>
        </div>
        {displayDescription && (
          <p className="text-sm text-slate-400 mt-2">{displayDescription}</p>
        )}
        <div className="flex flex-wrap gap-2">
          {displayAction.category && (
            <span className="text-xs px-2 py-1 rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30">
              {displayAction.category}
            </span>
          )}
          {displayAction.theme && (
            <span className="text-xs px-2 py-1 rounded-full bg-slate-500/20 text-slate-400 border border-slate-500/30">
              {displayAction.theme}
            </span>
          )}
          {displayAction.role && (
            <span className="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
              {displayAction.role}
            </span>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="p-6 space-y-4">
        {displayAction.estimated_time && (
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Clock className="w-4 h-4" />
            <span>Tempo estimado: {displayAction.estimated_time}</span>
          </div>
        )}

        {displayAction.expected_outputs && displayAction.expected_outputs.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-slate-300 mb-2">Entregas:</h4>
            <ul className="space-y-1">
              {displayAction.expected_outputs.slice(0, 3).map((output, idx) => (
                <li key={idx} className="text-sm text-slate-400 flex items-start gap-2">
                  <span className={`${colors.text} mt-1`}>•</span>
                  <span>{output}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <Button
          onClick={handleActivate}
          className={`w-full min-h-[44px] bg-gradient-to-r ${colors.bg} border ${colors.border} ${colors.text} hover:opacity-80 group-hover:translate-x-1 transition-all duration-300 touch-target`}
          variant="outline"
          aria-label={`Activate ${displayTitle}`}
        >
          <Zap className="w-4 h-4 mr-2" aria-hidden="true" />
          {displayTitle.includes("Strategic Intelligence") ? "Configurar SIU" : "Ativar Análise"}
          <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
        </Button>
      </CardContent>
    </Card>
  );
}