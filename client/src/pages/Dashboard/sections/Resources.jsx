import React, { useState } from "react";

export default function Resources({ nightMode, setPage }) {
  const [selectedResource, setSelectedResource] = useState(null);

  const resources = [
    ["Answer framework", "Use STAR to make your stories easy to follow.", "5 min read", "Interview"],
    ["Technical interview checklist", "A concise preparation list for problem-solving rounds.", "8 min read", "Technical"],
    ["Resume impact guide", "Turn responsibilities into clear, measurable outcomes.", "6 min read", "Resume"],
    ["Calm before the interview", "A short routine for arriving focused and present.", "4 min read", "Mindset"],
    ["System Design Cheatsheet", "Core components, load balancers, caching, and databases.", "12 min read", "System Design"],
    ["HR Interview Handbook", "Questions to ask your interviewer at the end of the round.", "7 min read", "Behavioral"],
    ["Aptitude Formulas", "Quick math shortcuts for quantitative aptitude tests.", "10 min read", "Aptitude"],
    ["Cold Email Templates", "How to reach out to recruiters and engineering managers.", "5 min read", "Networking"]
  ];

  const resourceContent = {
    "Answer framework": "### The STAR Method\n\n**Situation:** Set the scene and give the necessary details of your example.\n\n**Task:** Describe what your responsibility was in that situation.\n\n**Action:** Explain exactly what steps you took to address it.\n\n**Result:** Share what outcomes your actions achieved (use numbers if possible).",
    "Technical interview checklist": "### Problem Solving Strategy\n\n1. **Listen:** Understand the requirements and constraints.\n2. **Example:** Draw out a simple test case and an edge case.\n3. **Brute Force:** State the most obvious solution first, even if it's O(N^2).\n4. **Optimize:** Find bottlenecks. Can you use a HashMap? Two pointers?\n5. **Walk Through:** Mentally run your optimized approach.\n6. **Code:** Write clean code modularly.\n7. **Test:** Dry run your code with the edge case.",
    "Resume impact guide": "### Writing High-Impact Bullets\n\n**Formula:** [Action Word] + [Task] + [Result/Impact]\n\n- **Weak:** Fixed bugs in the payment system.\n- **Strong:** Resolved 40+ critical payment gateway bugs, reducing transaction failure rate by 15%.\n\nAlways start with strong action verbs (Architected, Spearheaded, Developed, Optimized). Quantify your results whenever possible.",
    "Calm before the interview": "### Pre-Interview Routine\n\n**10 Mins Before:** Close all unnecessary tabs. Keep only your resume and portfolio open.\n\n**Breath Work:** Inhale for 4 seconds, hold for 4, exhale for 6. Do this 3 times.\n\n**Mindset:** The interviewer is not trying to fail you. They have a problem (a vacancy) and want *you* to be the solution.",
    "System Design Cheatsheet": "### Core Components\n\n- **Load Balancers:** Distribute traffic (e.g., Nginx, HAProxy, AWS ALB).\n- **Caching:** Redis/Memcached to reduce DB load.\n- **Database Scaling:** Read replicas, Sharding (horizontal scaling), Partitioning.\n- **Message Queues:** Kafka, RabbitMQ, SQS for decoupling microservices.\n- **Trade-offs:** Consistency vs Availability (CAP Theorem).",
    "HR Interview Handbook": "### Great Questions to Ask\n\n1. What does a typical day look like for someone in this role?\n2. What are the biggest challenges the team is facing right now?\n3. How does the company measure success for this position?\n4. What is the engineering culture like regarding code reviews and testing?",
    "Aptitude Formulas": "### Quick Reference\n\n- **Speed, Distance, Time:** Distance = Speed × Time\n- **Work:** If A does work in X days, B in Y days, together = (X*Y)/(X+Y)\n- **Percentages:** (Part / Whole) × 100\n- **Permutations:** nPr = n! / (n-r)!\n- **Combinations:** nCr = n! / (r! * (n-r)!)",
    "Cold Email Templates": "### The Outreach Template\n\n**Subject:** Exploring [Role] opportunities - [Your Name]\n\nHi [Name],\n\nI hope you're having a great week.\n\nI’m [Your Name], a software engineer with [X] years of experience. I’ve been following [Company]'s work on [Specific Project] and love the approach.\n\nI noticed your team is hiring for a [Role]. I recently built [Relevant Project] which achieved [Result], and I'd love to bring this expertise to your team.\n\nAre you open to a brief chat next week? If not, no worries!\n\nBest,\n[Your Name]"
  };
  
  return (
    <section className="pb-8 relative">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-[#DCE3FA] bg-white/80 px-3 py-1 text-[10px] font-bold tracking-[0.14em] text-[#3355E8] shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#3355E8]" /> RESOURCE LIBRARY
          </p>
          <h1 className={`mt-3 font-hero text-3xl font-bold tracking-[-0.05em] sm:mt-4 sm:text-[44px] sm:leading-[1.1] ${nightMode ? "text-white" : "text-[#131A2E]"}`}>Useful when you need it.</h1>
        </div>
        <p className={`max-w-sm text-sm leading-6 mb-1 ${nightMode ? "text-slate-400" : "text-slate-600"}`}>Short, practical guides to help you prepare with more confidence.</p>
      </div>
      
      <div className="mt-8 grid gap-5 sm:gap-5 md:grid-cols-2">
        {resources.map(([title, description, duration, category]) => (
          <article key={title} className={`group rounded-[28px] sm:rounded-[28px] border p-5 sm:p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-hero cursor-pointer ${nightMode ? "border-white/10 bg-[#10173A]/50 hover:bg-[#10173A]" : "border-[#DCE3FA] bg-white hover:border-[#3355E8]/30"}`} onClick={() => setSelectedResource(title)}>
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-[#EAEEFC] px-3 py-1 text-[10px] font-bold tracking-[0.1em] text-[#3355E8]">{category}</span>
              <span className={`text-[10px] font-bold ${nightMode ? "text-slate-400" : "text-slate-400"}`}>{duration}</span>
            </div>
            
            <h2 className={`mt-5 font-display text-xl sm:text-[22px] font-bold tracking-tight transition-colors ${nightMode ? "text-slate-200 group-hover:text-white" : "text-[#131A2E] group-hover:text-[#3355E8]"}`}>{title}</h2>
            <p className={`mt-2 text-xs sm:text-sm leading-5 sm:leading-6 ${nightMode ? "text-slate-400" : "text-[#6B7280]"}`}>{description}</p>
            
            <button type="button" className="mt-5 inline-flex items-center font-bold text-[#3355E8] text-xs sm:text-sm transition group-hover:translate-x-1">
              Read Guide <span className="ml-1 sm:ml-2 text-base sm:text-lg" aria-hidden="true">→</span>
            </button>
          </article>
        ))}
      </div>

      {/* Reader Modal overlay */}
      {selectedResource && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 sm:p-6 transition-all duration-300" onClick={() => setSelectedResource(null)}>
          <div 
            className={`w-full max-w-2xl overflow-hidden rounded-[32px] shadow-2xl transition-all duration-300 transform scale-100 ${nightMode ? "bg-[#0B1026] border border-white/10 text-white" : "bg-white border border-slate-100 text-[#131A2E]"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`flex items-center justify-between border-b px-6 py-5 sm:px-8 sm:py-6 ${nightMode ? "border-white/10" : "border-slate-100"}`}>
              <h2 className="font-display text-xl sm:text-2xl font-bold">{selectedResource}</h2>
              <button onClick={() => setSelectedResource(null)} className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${nightMode ? "bg-white/10 hover:bg-white/20 text-slate-300" : "bg-slate-100 hover:bg-slate-200 text-slate-600"}`}>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            
            <div className={`max-h-[70vh] overflow-y-auto px-6 py-6 sm:px-8 sm:py-8 space-y-6 ${nightMode ? "text-slate-300" : "text-slate-600"}`}>
              {resourceContent[selectedResource].split('\n\n').map((paragraph, idx) => {
                if (paragraph.startsWith('###')) {
                  return <h3 key={idx} className={`font-display text-xl font-bold mt-2 ${nightMode ? "text-blue-400" : "text-[#0057FF]"}`}>{paragraph.replace('### ', '')}</h3>;
                } else if (paragraph.startsWith('-')) {
                  return <ul key={idx} className="space-y-3 list-none">
                    {paragraph.split('\n').map((item, i) => (
                      <li key={i} className="flex gap-3 text-[15px] leading-relaxed"><span className={`${nightMode ? "text-blue-400" : "text-[#0057FF]"}`}>•</span> <span dangerouslySetInnerHTML={{__html: item.replace('- ', '').replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')}} /></li>
                    ))}
                  </ul>;
                } else {
                  return <p key={idx} className="text-[15px] leading-relaxed" dangerouslySetInnerHTML={{__html: paragraph.replace(/\*\*(.*?)\*\*/g, '<b class="text-slate-800 dark:text-white">$1</b>').replace(/\*(.*?)\*/g, '<i>$1</i>')}}></p>;
                }
              })}
            </div>
            
            <div className={`border-t px-6 py-5 sm:px-8 sm:py-6 flex justify-end ${nightMode ? "border-white/10 bg-[#0B1026]" : "border-slate-100 bg-slate-50"}`}>
              <button onClick={() => setSelectedResource(null)} className="rounded-xl bg-[#0057FF] px-6 py-2.5 text-sm font-bold text-white shadow-md shadow-blue-500/20 hover:bg-blue-600 transition-colors">Got it</button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
