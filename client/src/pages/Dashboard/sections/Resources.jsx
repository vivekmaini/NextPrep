import { useState } from "react";

export default function Resources({ nightMode }) {
  const [selectedResource, setSelectedResource] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const resources = [
    {
      title: "Answer Framework (STAR Method)",
      description: "Learn how top candidates structure behavioral answers into compelling, structured stories.",
      duration: "5 min read",
      category: "Interview",
      url: "https://www.themuse.com/advice/star-interview-method",
      source: "The Muse",
      summary: "### The STAR Method\n\n**Situation:** Set the scene and give the necessary context of your example.\n\n**Task:** Describe what your exact responsibility was in that situation.\n\n**Action:** Explain clearly what steps you took to address the problem or challenge.\n\n**Result:** Share what outcomes your actions achieved (use quantified metrics whenever possible)."
    },
    {
      title: "Technical Interview Handbook",
      description: "The famous, curated problem-solving algorithms guide and coding rounds checklist by Yangshun Tay.",
      duration: "8 min read",
      category: "Technical",
      url: "https://www.techinterviewhandbook.org/coding-interview-prep/",
      source: "Tech Interview Handbook",
      summary: "### Problem Solving Strategy\n\n1. **Listen:** Understand the requirements and edge constraints.\n2. **Example:** Draw out a simple test case and an extreme edge case.\n3. **Brute Force:** State the most obvious solution first, even if it's O(N^2).\n4. **Optimize:** Find bottlenecks. Can you use a HashMap? Two pointers? Prefix sum?\n5. **Walk Through:** Mentally run your optimized approach step-by-step.\n6. **Code:** Write clean, modular code with descriptive variable names.\n7. **Test:** Dry run your code with edge cases before saying you are done."
    },
    {
      title: "Google XYZ Resume Impact Guide",
      description: "Use Google recruiters' 'Accomplished [X] as measured by [Y] by doing [Z]' formula for high ATS scores.",
      duration: "6 min read",
      category: "Resume",
      url: "https://www.inc.com/bill-murphy-jr/google-recruiters-say-these-5-words-are-best-way-to-improve-a-resume-in-10-seconds.html",
      source: "Inc. / Google Guide",
      summary: "### Writing High-Impact Bullets\n\n**Formula:** [Action Word] + [Task] + [Result/Impact]\n\n- **Weak:** Fixed bugs in the payment system.\n- **Strong:** Resolved 40+ critical payment gateway bugs, reducing transaction failure rate by 15%.\n\nAlways start with strong action verbs (Architected, Spearheaded, Developed, Optimized). Quantify your results whenever possible."
    },
    {
      title: "System Design Primer & Cheatsheet",
      description: "Comprehensive open-source guide to scalable architectures, load balancers, caching, and databases.",
      duration: "12 min read",
      category: "System Design",
      url: "https://github.com/donnemartin/system-design-primer",
      source: "GitHub / Donne Martin",
      summary: "### Core System Design Components\n\n- **Load Balancers:** Distribute incoming traffic evenly (e.g. Nginx, HAProxy, AWS ALB).\n- **Caching Layers:** Redis / Memcached in-memory stores to dramatically reduce DB queries.\n- **Database Scaling:** Read replicas, Sharding (horizontal partition), Partitioning.\n- **Message Queues:** Kafka, RabbitMQ, SQS for decoupling distributed services.\n- **CAP Theorem:** Consistency vs Availability vs Partition Tolerance trade-offs."
    },
    {
      title: "Top 50 HR Interview Questions & Answers",
      description: "Master the most common behavioral, situational, and culture-fit questions with winning strategies.",
      duration: "7 min read",
      category: "HR Round",
      url: "https://www.geeksforgeeks.org/top-50-hr-interview-questions-and-answers/",
      source: "GeeksforGeeks",
      summary: "### Great Questions to Ask Interviewers\n\n1. What does a typical day look like for someone in this role?\n2. What are the biggest technical challenges the team is facing right now?\n3. How does the company measure engineering success for this position?\n4. What is the engineering culture like regarding code reviews, testing, and autonomy?"
    },
    {
      title: "NeetCode DSA Roadmap & Blind 75",
      description: "The definitive roadmap of essential Data Structures & Algorithms patterns for placement coding rounds.",
      duration: "15 min read",
      category: "Coding",
      url: "https://neetcode.io/roadmap",
      source: "NeetCode.io",
      summary: "### Core DSA Patterns\n\n- **Arrays & Hashing:** Two Sum, Group Anagrams, Top K Frequent Elements.\n- **Two Pointers & Sliding Window:** Best Time to Buy/Sell Stock, 3Sum, Trapping Rain Water.\n- **Trees & Graphs:** DFS, BFS, Lowest Common Ancestor, Topological Sort.\n- **Dynamic Programming:** Climbing Stairs, Coin Change, Longest Increasing Subsequence."
    },
    {
      title: "Quantitative Aptitude Formulas & Tricks",
      description: "Essential shortcut formulas for speed, distance, time, work, permutations, and percentages.",
      duration: "10 min read",
      category: "Aptitude",
      url: "https://www.indiabix.com/aptitude/questions-and-answers/",
      source: "IndiaBIX",
      summary: "### Quick Reference Formulas\n\n- **Speed, Distance, Time:** Distance = Speed × Time; Average Speed = 2xy / (x + y)\n- **Time & Work:** If A takes X days and B takes Y days, together = (X × Y) / (X + Y)\n- **Percentages:** Percentage Change = (Difference / Original Value) × 100\n- **Permutations & Combinations:** nPr = n! / (n - r)! | nCr = n! / (r! × (n - r)!)"
    },
    {
      title: "Cold Email & Networking Templates",
      description: "Proven outreach templates to connect with recruiters, engineering managers, and alumni on LinkedIn.",
      duration: "5 min read",
      category: "Networking",
      url: "https://blog.hubspot.com/sales/cold-email-templates",
      source: "HubSpot Career",
      summary: "### The Outreach Formula\n\n**Subject:** Exploring [Role] opportunities - [Your Name]\n\nHi [Name],\n\nI hope you are having a productive week.\n\nI noticed your team is expanding the [Team Name] division. I recently built [Specific Project] using [Tech Stack] which achieved [Measurable Outcome].\n\nI would love to learn more about the engineering challenges your team is solving. Are you open to a brief 10-minute chat next week?\n\nBest,\n[Your Name]"
    },
    {
      title: "Calm Before the Interview (Mindset)",
      description: "Harvard Business Review routine to conquer nervousness and enter interviews with peak confidence.",
      duration: "4 min read",
      category: "Mindset",
      url: "https://hbr.org/2021/08/how-to-handle-job-interview-anxiety",
      source: "Harvard Business Review",
      summary: "### Pre-Interview Psychological Routine\n\n**10 Mins Before:** Close all unnecessary tabs. Keep only your resume and clean workspace open.\n\n**Box Breathing:** Inhale for 4 seconds, hold for 4, exhale for 4, hold for 4. Repeat 3 times to stabilize heart rate.\n\n**Reframing:** The interviewer is not an interrogator looking to fail you. They have an open role and are hoping you are the right person to solve their problem."
    },
    {
      title: "Top 50 SQL Interview Queries",
      description: "Master JOINS, subqueries, window functions (DENSE_RANK), and aggregation for database rounds.",
      duration: "9 min read",
      category: "Technical",
      url: "https://leetcode.com/studyplan/top-sql-50/",
      source: "LeetCode SQL 50",
      summary: "### High-Frequency SQL Patterns\n\n- **Second Highest Salary:** `SELECT MAX(salary) FROM employees WHERE salary < (SELECT MAX(salary) FROM employees);`\n- **Window Functions:** `SELECT id, name, DENSE_RANK() OVER (PARTITION BY dept_id ORDER BY salary DESC) as rank FROM employees;`\n- **Delete Duplicates:** Using `ROW_NUMBER()` or `MIN(id)` self-join.\n- **GROUP BY + HAVING:** Filtering aggregated data sets."
    }
  ];

  const categories = ["All", "Interview", "Technical", "Coding", "System Design", "Resume", "HR Round", "Aptitude"];

  const filteredResources = activeCategory === "All"
    ? resources
    : resources.filter((item) => item.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <section className="pb-8 relative">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-[#DCE3FA] bg-white/80 px-3 py-1 text-[10px] font-bold tracking-[0.14em] text-[#3355E8] shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#3355E8]" /> CURATED RESOURCE LIBRARY
          </p>
          <h1 className={`mt-3 font-hero text-3xl font-bold tracking-[-0.05em] sm:mt-4 sm:text-[44px] sm:leading-[1.1] ${nightMode ? "text-white" : "text-[#131A2E]"}`}>
            Placement Prep Articles & Guides
          </h1>
        </div>
        <p className={`max-w-sm text-sm leading-6 mb-1 ${nightMode ? "text-slate-400" : "text-slate-600"}`}>
          Authoritative articles, cheatsheets, and roadmaps to boost your interview performance.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="mt-6 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all border shadow-sm ${
              activeCategory === cat
                ? "bg-[#3355E8] border-[#3355E8] text-white shadow-blue-500/20"
                : (nightMode ? "border-white/10 bg-[#10173A] text-slate-300 hover:bg-white/10" : "border-[#DCE3FA] bg-white text-slate-600 hover:bg-slate-50")
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      
      {/* Resources Cards Grid */}
      <div className="mt-8 grid gap-5 sm:gap-6 md:grid-cols-2">
        {filteredResources.map((res) => (
          <article 
            key={res.title} 
            className={`group rounded-[28px] border p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-hero flex flex-col justify-between ${
              nightMode ? "border-white/10 bg-[#10173A]/50 hover:bg-[#10173A]" : "border-[#DCE3FA] bg-white hover:border-[#3355E8]/30"
            }`}
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-[#EAEEFC] px-3 py-1 text-[10px] font-bold tracking-[0.1em] text-[#3355E8]">
                    {res.category}
                  </span>
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-md border ${nightMode ? "border-white/10 text-slate-400 bg-white/5" : "border-slate-200 text-slate-500 bg-slate-50"}`}>
                    {res.source}
                  </span>
                </div>
                <span className={`text-[10px] font-bold ${nightMode ? "text-slate-400" : "text-slate-400"}`}>
                  {res.duration}
                </span>
              </div>
              
              <h2 className={`mt-5 font-display text-xl font-bold tracking-tight transition-colors ${nightMode ? "text-slate-200 group-hover:text-white" : "text-[#131A2E] group-hover:text-[#3355E8]"}`}>
                {res.title}
              </h2>
              <p className={`mt-2 text-xs sm:text-sm leading-5 sm:leading-6 ${nightMode ? "text-slate-400" : "text-[#6B7280]"}`}>
                {res.description}
              </p>
            </div>
            
            <div className="mt-6 pt-5 border-t border-[#DCE3FA]/50 flex items-center justify-between gap-3">
              <button 
                type="button" 
                onClick={() => setSelectedResource(res)}
                className={`text-xs font-bold px-3.5 py-2 rounded-xl transition-colors ${nightMode ? "bg-white/10 text-slate-300 hover:bg-white/20" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}
              >
                Quick Summary
              </button>

              <a 
                href={res.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#3355E8] hover:text-blue-700 transition-colors group-hover:translate-x-0.5"
              >
                Read Full Article <span className="text-base" aria-hidden="true">↗</span>
              </a>
            </div>
          </article>
        ))}
      </div>

      {/* Reader Modal overlay */}
      {selectedResource && (
        <div 
          className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 sm:p-6 transition-all duration-300" 
          onClick={() => setSelectedResource(null)}
        >
          <div 
            className={`w-full max-w-2xl overflow-hidden rounded-[32px] shadow-2xl transition-all duration-300 transform scale-100 ${nightMode ? "bg-[#0B1026] border border-white/10 text-white" : "bg-white border border-slate-100 text-[#131A2E]"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`flex items-center justify-between border-b px-6 py-5 sm:px-8 sm:py-6 ${nightMode ? "border-white/10" : "border-slate-100"}`}>
              <div>
                <span className="text-[10px] font-bold text-[#3355E8] uppercase tracking-wider">{selectedResource.category} · {selectedResource.source}</span>
                <h2 className="font-display text-xl sm:text-2xl font-bold mt-0.5">{selectedResource.title}</h2>
              </div>
              <button 
                onClick={() => setSelectedResource(null)} 
                className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${nightMode ? "bg-white/10 hover:bg-white/20 text-slate-300" : "bg-slate-100 hover:bg-slate-200 text-slate-600"}`}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className={`max-h-[60vh] overflow-y-auto px-6 py-6 sm:px-8 sm:py-8 space-y-5 ${nightMode ? "text-slate-300" : "text-slate-600"}`}>
              {selectedResource.summary.split('\n\n').map((paragraph, idx) => {
                if (paragraph.startsWith('###')) {
                  return <h3 key={idx} className={`font-display text-lg font-bold mt-2 ${nightMode ? "text-blue-400" : "text-[#0057FF]"}`}>{paragraph.replace('### ', '')}</h3>;
                } else if (paragraph.startsWith('-')) {
                  return <ul key={idx} className="space-y-2.5 list-none">
                    {paragraph.split('\n').map((item, i) => (
                      <li key={i} className="flex gap-2.5 text-[14px] leading-relaxed">
                        <span className={`${nightMode ? "text-blue-400" : "text-[#0057FF]"}`}>•</span> 
                        <span dangerouslySetInnerHTML={{__html: item.replace('- ', '').replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')}} />
                      </li>
                    ))}
                  </ul>;
                } else {
                  return <p key={idx} className="text-[14px] leading-relaxed" dangerouslySetInnerHTML={{__html: paragraph.replace(/\*\*(.*?)\*\*/g, '<b class="text-slate-800 dark:text-white">$1</b>').replace(/\*(.*?)\*/g, '<i>$1</i>')}}></p>;
                }
              })}
            </div>
            
            <div className={`border-t px-6 py-5 sm:px-8 sm:py-6 flex flex-col sm:flex-row items-center justify-between gap-3 ${nightMode ? "border-white/10 bg-[#0B1026]" : "border-slate-100 bg-slate-50"}`}>
              <a 
                href={selectedResource.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#0057FF] px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-500/20 hover:bg-blue-600 transition-colors"
              >
                Open Original Article ({selectedResource.source}) ↗
              </a>
              <button 
                onClick={() => setSelectedResource(null)} 
                className="w-full sm:w-auto rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
