import { useState } from "react";

const SECTIONS = [
  { id: "overview", label: "📋 What is an NPP HCP Interview?" },
  { id: "structure", label: "🗂️ Interview Structure" },
  { id: "mock", label: "🎭 Mock Interview — Full Example" },
  { id: "probes", label: "🔍 Probing Techniques" },
  { id: "analysis", label: "📊 What to Do with Insights" },
];

const MOCK_INTERVIEW = [
  {
    phase: "OPENING",
    color: "#e8f4fd",
    border: "#4a9fd4",
    label: "Phase 1: Warm-Up & Screener (5 min)",
    purpose: "Build rapport. Confirm HCP is the right profile. Set expectations.",
    exchanges: [
      { role: "Moderator", text: "Dr. Chen, thank you for your time today. Just to set expectations — this is a 45-minute research conversation. There are no right or wrong answers. We're here to learn from your clinical experience, not to sell anything. Everything you share is confidential and won't be attributed to you personally. Does that work for you?", annotation: null },
      { role: "Dr. Chen (Neurologist)", text: "Yes, that's fine. I see a fair number of neuropathic pain patients so happy to share.", annotation: null },
      { role: "Moderator", text: "Perfect. To start — could you briefly describe your practice? Roughly how many patients with peripheral neuropathic pain do you see per month, and what types?", annotation: "Screener check: confirm volume and mix (DPN, PHN, other). If <5/month, note as low-volume HCP." },
      { role: "Dr. Chen", text: "I'd say 20–25 PNP patients a month. Mostly diabetic peripheral neuropathy — DPN is probably 60% of my neuropathic pain caseload. Some post-herpetic neuralgia, a few with chemotherapy-induced neuropathy.", annotation: "HIGH VALUE respondent. DPN-heavy. Will have strong opinions on pregabalin titration." },
    ],
  },
  {
    phase: "LANDSCAPE",
    color: "#f0fdf4",
    border: "#3a9e68",
    label: "Phase 2: Current Practice & Unmet Need (10 min)",
    purpose: "Understand the physician's world BEFORE showing the product. Never lead with the TPP.",
    exchanges: [
      { role: "Moderator", text: "Walk me through how you typically approach a new patient presenting with moderate peripheral neuropathic pain. What does your first conversation look like, and what's your initial treatment decision?", annotation: "Open-ended. Let them talk. Don't interrupt. Note: first-line choices, triggers for treatment, patient factors they mention unprompted." },
      { role: "Dr. Chen", text: "So if it's confirmed neuropathic pain — I usually do the DN4 screen — and they have moderate severity, I typically start with duloxetine or pregabalin. Duloxetine has become my default first-line because it has a cleaner AE profile for my older patients. Pregabalin I use but I'm always cautious about the dizziness and the weight gain.", annotation: "KEY INSIGHT: Duloxetine preferred over pregabalin. Reason: AE profile, not efficacy. Probe this further." },
      { role: "Moderator", text: "You mentioned dizziness and weight gain with pregabalin. How often does that actually change your management — is it something you anticipate, or does it tend to come up after you've already started the drug?", annotation: "Probing technique: echo + drill down. Don't editorialize. Let them quantify the problem." },
      { role: "Dr. Chen", text: "It comes up pretty quickly — usually within the first two weeks. I start them on 75mg a day, sometimes 150, and if they're going to get dizzy they'll tell me at the first follow-up. I've had patients fall because of it. So now I almost always start low and go slow, especially in patients over 65.", annotation: "CRITICAL FINDING: Falls risk is a real concern. Starting dose practice is LOWER than label (75mg vs. 150mg). Speed of titration is physician-driven, not label-driven." },
      { role: "Moderator", text: "If you could wave a magic wand and have a medication for these patients that didn't exist yet — what would be different about it compared to what you have today?", annotation: "Classic unmet need probe. Note: Do they mention efficacy, safety, convenience, dosing, or payer/access unprompted?" },
      { role: "Dr. Chen", text: "Honestly? Better efficacy without the side effects. These drugs work okay — maybe 30-40% of patients get meaningful relief — but it's not great. I'd love something that works faster too. Pregabalin takes weeks to see if it's working. And honestly, something that doesn't require me to babysit the titration as much.", annotation: "THREE UNMET NEEDS IDENTIFIED unprompted: (1) Efficacy — only 30-40% responders, (2) Speed of onset, (3) Titration burden. All highly relevant for ComboX positioning." },
    ],
  },
  {
    phase: "TPP",
    color: "#fef9c3",
    border: "#ca8a04",
    label: "Phase 3: TPP Concept Reaction (15 min)",
    purpose: "Show the hypothetical product profile. Measure appeal, differentiation, and barriers.",
    exchanges: [
      { role: "Moderator", text: "I'm going to share a brief description of a hypothetical medicine that's being developed — this is early stage, nothing approved. I'd love your honest reaction. [Shows TPP card]\n\n'ComboX is an investigational once-daily oral agent combining two complementary mechanisms — a Nav1.8 inhibitor and a norepinephrine reuptake inhibitor — for the management of both acute pain and peripheral neuropathic pain. In Phase 2 studies, ComboX showed meaningful pain reduction within 3–5 days of initiation without a titration requirement.'", annotation: "TPP reveal. Show written card — don't read it aloud only. Give them 30 seconds to read first silently. Watch non-verbal cues." },
      { role: "Dr. Chen", text: "Interesting. The fast onset is appealing — that's definitely something my patients ask about. The dual mechanism... I'd want to know more about the safety. With two mechanisms you can have additive side effects.", annotation: "TYPICAL FIRST REACTION: Lead with a positive, then immediately pivot to concern. Safety is the instinctive barrier for dual-mechanism agents." },
      { role: "Moderator", text: "That's a very fair reaction. Setting safety aside just for a moment — if the safety were acceptable, what would excite you most about this profile?", annotation: "Technique: 'park' the objection temporarily. Get the ceiling of excitement before dealing with barriers. You'll come back to safety." },
      { role: "Dr. Chen", text: "The no-titration piece. If I can just start them and they feel something working within a week — that's huge for adherence. Neuropathic pain patients are very adherence-challenged. They stop taking drugs that don't seem to be doing anything. If this works fast and they feel it, they'll stay on it.", annotation: "STRONGEST APPEAL: No titration + fast onset = adherence benefit. This is the commercial hook. Note the patient behavior insight: early non-responders discontinue." },
      { role: "Moderator", text: "Now let's come back to safety. What would you specifically want to see in the safety profile to be comfortable prescribing this?", annotation: "Return to the parked objection. Get specific — not just 'good safety' but which AEs matter most." },
      { role: "Dr. Chen", text: "No significant CNS effects — no dizziness, no cognitive fog. That's my biggest concern with existing options. And cardiovascular — if there's any NRI component I want to know about BP effects. And no abuse potential.", annotation: "THREE SAFETY THRESHOLDS: (1) CNS clean — dizziness/cognition, (2) CV — BP with NRI MOA, (3) Abuse potential. These map directly to clinical trial endpoints to emphasize." },
    ],
  },
  {
    phase: "DOSING",
    color: "#fdf4ff",
    border: "#a855f7",
    label: "Phase 4: Dosing & Titration Deep Dive (10 min)",
    purpose: "Test specific label language.",
    exchanges: [
      { role: "Moderator", text: "I want to show you two possible dosing scenarios for ComboX and get your reaction to each. [Shows Label Version A: 50mg QD fixed] What's your initial reaction?", annotation: "Show written label language — the exact wording matters. Probe for both prescribing intent AND patient communication." },
      { role: "Dr. Chen", text: "Simple. I like simple. One dose, no adjustment — I can write that in my sleep and patients can remember it. But... I'm a little nervous about one-size-fits-all for neuropathic pain. My patients vary a lot.", annotation: "TENSION: Values simplicity but clinically skeptical of fixed dosing for a variable condition. This is the core commercial tension to resolve." },
      { role: "Moderator", text: "[Shows Label Version B: 25mg BID start, titrating to 50mg BID for acute, up to 100mg BID for PNP] How does this compare?", annotation: null },
      { role: "Dr. Chen", text: "This is more like what I'm used to. Two separate algorithms for acute versus chronic — that actually makes clinical sense to me. But two weeks to get to the right dose is still a lot of time for an acute pain patient. They want relief now.", annotation: "INSIGHT: Titration algorithm is clinically credible but onset-to-relief window remains a concern for acute. Validates differentiation of acute vs. PNP dosing." },
      { role: "Moderator", text: "If you were managing a patient with moderate diabetic peripheral neuropathy who had failed duloxetine — which of these two dosing options would make you more likely to try ComboX?", annotation: "Force preference. Don't let them say 'both are fine.' This is the money question for the label strategy." },
      { role: "Dr. Chen", text: "Honestly for that patient — Version A. They've already been through the titration experience with duloxetine, they're frustrated. A clean once-daily with no steps appeals to them and to me. For a de novo patient with acute pain, same answer — Version A.", annotation: "CLEAR PREFERENCE: Fixed QD (Version A) for post-failure PNP and acute patients. Titration arm (Version B) may appeal more to cautious first-line prescribers. Segment finding." },
      { role: "Moderator", text: "At what point in managing a patient on ComboX would you consider stopping it versus staying the course?", annotation: "Clinical decision threshold probe. Maps to NRS scoring and trial duration." },
      { role: "Dr. Chen", text: "I give things 4–6 weeks minimum. If at 4 weeks they have no meaningful improvement — I mean nothing, NRS still at 7 or above — I'm reconsidering. If they have some improvement, I'll push to 8 weeks. If there are intolerable side effects at any point, I stop faster.", annotation: "CLINICAL THRESHOLD: 4-week minimum trial. NRS ≥ 7 = failure signal. Tolerability trumps efficacy for discontinuation timing." },
    ],
  },
  {
    phase: "CLOSING",
    color: "#fff1f2",
    border: "#f43f5e",
    label: "Phase 5: Adoption Intent & Closing (5 min)",
    purpose: "Quantify likelihood to prescribe. Surface final barriers. Close warmly.",
    exchanges: [
      { role: "Moderator", text: "Last few questions. On a scale of 1 to 10, how likely would you be to prescribe ComboX — as described today — if it were approved with a clean safety profile? And what would move that number up?", annotation: "Standard adoption intent scale. Always follow with 'what would move it up' — more actionable than the number itself." },
      { role: "Dr. Chen", text: "I'd say a 6 right now. It would move to an 8 or 9 if I saw head-to-head data against pregabalin with fewer CNS side effects. And payer coverage — if it's not covered it doesn't matter how good it is.", annotation: "BARRIERS TO FULL ADOPTION: (1) Comparative clinical data vs. standard of care, (2) Payer/access. Both are pre-launch workstreams. 6/10 interest is solid for a Phase 2 asset." },
      { role: "Moderator", text: "Last question — is there anything about your patients' experience with neuropathic pain treatment that we haven't touched on today that you think would be important for us to understand?", annotation: "Open close — often surfaces the richest unprompted insight. Don't skip this." },
      { role: "Dr. Chen", text: "The mental health piece. A lot of my neuropathic pain patients also have depression or anxiety. If ComboX has any mood benefit — even incidentally — that would be a real differentiator. And the opposite: if it worsens mood or causes cognitive issues, it'll fail in the real world even if it passes in trials.", annotation: "BONUS INSIGHT: Comorbid depression/anxiety in PNP patients. Dual-mechanism with NRI component may have incidental mood benefit — worth flagging to medical/clinical team." },
    ],
  },
];

const PROBING_TECHNIQUES = [
  { name: "Echo", example: '"You mentioned dizziness — tell me more about that."', when: "Use when HCP mentions something important unpromptedly. Repeat their own word back." },
  { name: "Laddering", example: '"Why is that important to you?" (repeat 2–3x)', when: "Use to get from surface preference to underlying motivation." },
  { name: "Park & Return", example: '"Set safety aside for a moment — what excites you? ... Now let\'s come back to safety."', when: "Use when an objection surfaces before you've captured the upside." },
  { name: "Force Preference", example: '"If you had to choose just one — which would it be and why?"', when: "Use when HCP gives a non-committal 'both are good' answer." },
  { name: "Magic Wand", example: '"If you could design the perfect treatment for these patients, what would it look like?"', when: "Use in landscape phase to surface unmet needs without leading." },
  { name: "Worst Case", example: '"What would make you stop using this drug immediately?"', when: "Use to identify safety red lines and deal-breakers." },
  { name: "Patient Narrative", example: '"Can you describe a specific patient who would be a good candidate for this?"', when: "Use to move from abstract preferences to concrete clinical scenarios." },
];

const ANALYSIS_FRAMEWORK = [
  { category: "Unmet Need Validation", question: "Which unmet needs did HCPs mention UNPROMPTED?", why: "Unprompted = real. Prompted = rationalized. Prioritize unprompted themes." },
  { category: "Concept Appeal Ceiling", question: "What is the maximum excitement level, setting objections aside?", why: "Tells you the best-case commercial scenario. Informs the headline claim." },
  { category: "Barriers & Thresholds", question: "What specific safety, efficacy, or access criteria must be met?", why: "Informs clinical trial design, label strategy, and market access workstreams." },
  { category: "Dosing Preference", question: "Which label version did HCPs prefer, and why?", why: "Directly feeds back to the label wording decision." },
  { category: "Segmentation Signal", question: "Did preference vary by HCP type (neurologist vs. PCP vs. pain specialist)?", why: "Informs targeting strategy and messaging differentiation." },
  { category: "Adoption Intent Score", question: "What is the average 1–10 score, and what would raise it?", why: "Baseline for tracking across research waves. 'What would raise it' = investment priorities." },
];

export default function App() {
  const [activeSection, setActiveSection] = useState("overview");
  const [expandedExchange, setExpandedExchange] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div style={{ fontFamily: "'Georgia', serif", background: "#f4f2ed", minHeight: "100vh" }}>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #f4f2ed; }

        .header {
          background: linear-gradient(135deg, #1a3d2b 0%, #2d6a4f 100%);
          color: white;
          padding: 24px 24px 20px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.15);
          position: sticky; top: 0; z-index: 100;
        }
        .header-inner { max-width: 1000px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
        .header-title { font-size: 22px; font-weight: 700; letter-spacing: -0.3px; }
        .header-sub { font-size: 13px; opacity: 0.75; margin-top: 3px; }
        .pill { display: inline-block; background: rgba(255,255,255,0.18); border: 1px solid rgba(255,255,255,0.3); border-radius: 20px; padding: 4px 12px; font-size: 11px; font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase; }

        .layout { max-width: 1000px; margin: 0 auto; padding: 28px 16px; display: flex; gap: 24px; align-items: flex-start; }

        .sidebar { width: 210px; flex-shrink: 0; position: sticky; top: 90px; }
        .sidebar-label { font-size: 10px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: #888; margin-bottom: 10px; padding-left: 4px; }
        .nav-btn { display: flex; width: 100%; padding: 10px 12px; border-radius: 8px; border: 1.5px solid transparent; background: white; cursor: pointer; font-size: 13px; font-family: Georgia, serif; color: #444; text-align: left; transition: all 0.15s; margin-bottom: 5px; box-shadow: 0 1px 3px rgba(0,0,0,0.06); }
        .nav-btn:hover { background: #f0fdf4; border-color: #3a9e68; color: #1a3d2b; transform: translateX(2px); }
        .nav-btn.active { background: #1a3d2b; color: white; border-color: #1a3d2b; box-shadow: 0 2px 8px rgba(26,61,43,0.3); }

        .main { flex: 1; min-width: 0; }

        .section-heading { font-size: 21px; font-weight: 700; margin-bottom: 6px; color: #111; }
        .section-sub { font-size: 13px; color: #777; margin-bottom: 20px; font-style: italic; }

        .card { background: white; border-radius: 12px; border: 1px solid #e5e7eb; padding: 20px; margin-bottom: 14px; box-shadow: 0 1px 4px rgba(0,0,0,0.05); }
        .card-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px; }
        .card-grid .card { margin-bottom: 0; }
        .card-title { font-weight: 700; font-size: 13px; color: #1a3d2b; margin-bottom: 6px; }
        .card-body { font-size: 13px; color: #555; line-height: 1.65; }

        .alert { border-radius: 10px; padding: 16px; border: 1px solid; }
        .alert-yellow { background: #fef9c3; border-color: #fde68a; }
        .alert-title { font-weight: 700; font-size: 13px; margin-bottom: 8px; color: #92400e; }
        .alert-yellow p { font-size: 13px; color: #78350f; line-height: 1.7; }

        .phase-block { border-radius: 12px; padding: 18px; margin-bottom: 12px; border: 1.5px solid #e5e7eb; }
        .phase-block-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; flex-wrap: wrap; gap: 8px; }
        .phase-block-title { font-weight: 700; font-size: 15px; }
        .time-badge { display: inline-block; background: #1a3d2b; color: white; border-radius: 20px; padding: 3px 12px; font-size: 11px; font-weight: 700; white-space: nowrap; }
        .phase-item { display: flex; gap: 8px; align-items: flex-start; margin-bottom: 6px; }
        .phase-item-dot { color: #1a3d2b; font-weight: 700; margin-top: 2px; flex-shrink: 0; font-size: 15px; }
        .phase-item-text { font-size: 13px; color: #444; line-height: 1.6; }

        .mock-phase { margin-bottom: 28px; }
        .mock-phase-header { border-radius: 10px; padding: 14px 18px; margin-bottom: 14px; border: 2px solid; }
        .mock-phase-title { font-weight: 700; font-size: 15px; margin-bottom: 3px; }
        .mock-phase-purpose { font-size: 13px; color: #555; font-style: italic; }

        .exchange-card { border-radius: 10px; margin-bottom: 10px; overflow: hidden; border: 1px solid #e5e7eb; box-shadow: 0 1px 3px rgba(0,0,0,0.05); transition: box-shadow 0.15s; }
        .exchange-card.clickable { cursor: pointer; }
        .exchange-card.clickable:hover { box-shadow: 0 3px 10px rgba(0,0,0,0.1); }
        .role-bar { padding: 7px 14px; font-size: 11.5px; font-weight: 700; font-family: Georgia, serif; display: flex; align-items: center; gap: 8px; }
        .role-bar .hint { opacity: 0.65; font-weight: 400; font-size: 11px; }
        .role-moderator { background: #1a3d2b; color: white; }
        .role-hcp { background: #3b0764; color: white; }
        .speech { padding: 13px 16px; background: white; font-size: 14px; line-height: 1.7; color: #1a1a1a; white-space: pre-line; }
        .annotation-bar { padding: 10px 16px; background: #fffbeb; border-top: 1px solid #fde68a; font-size: 12.5px; color: #92400e; font-style: italic; line-height: 1.6; }

        .technique-card { background: white; border-radius: 10px; padding: 16px; border: 1px solid #e5e7eb; margin-bottom: 10px; display: flex; gap: 12px; align-items: flex-start; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
        .technique-tag { display: inline-block; background: #1a3d2b; color: white; border-radius: 20px; padding: 3px 11px; font-size: 11.5px; font-weight: 700; white-space: nowrap; flex-shrink: 0; margin-top: 1px; }
        .technique-example { font-size: 13.5px; color: #1a1a1a; margin-bottom: 6px; font-style: italic; }
        .technique-when { font-size: 12px; color: #666; }
        .technique-when strong { color: #444; }

        .dont-list { list-style: none; }
        .dont-list li { display: flex; gap: 9px; margin-bottom: 6px; font-size: 13px; color: #78350f; align-items: flex-start; }
        .dont-list li .x { color: #dc2626; font-weight: 700; flex-shrink: 0; margin-top: 1px; }

        .analysis-card { background: white; border-radius: 10px; padding: 16px 18px; border-left: 4px solid #1a3d2b; margin-bottom: 10px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
        .analysis-category { font-weight: 700; font-size: 14px; color: #1a3d2b; margin-bottom: 5px; }
        .analysis-question { font-size: 13px; color: #333; margin-bottom: 5px; }
        .analysis-why { font-size: 12px; color: #777; font-style: italic; }

        .action-list { list-style: none; margin-top: 10px; }
        .action-list li { display: flex; gap: 9px; margin-bottom: 7px; font-size: 13px; color: #333; align-items: flex-start; }
        .action-list li .arrow { color: #1a3d2b; font-weight: 700; flex-shrink: 0; }

        @media (max-width: 680px) {
          .sidebar { display: none; }
          .card-grid { grid-template-columns: 1fr; }
          .layout { padding: 16px 12px; }
          .header-title { font-size: 18px; }
        }
      `}</style>

      <header className="header">
        <div className="header-inner">
          <div>
            <div className="header-title">HCP Interview Guide</div>
            <div className="header-sub">New Product Planning · ComboX · Acute Pain + Peripheral Neuropathic Pain</div>
          </div>
          <span className="pill">Confidential</span>
        </div>
      </header>

      <div className="layout">
        <nav className="sidebar">
          <div className="sidebar-label">Sections</div>
          {SECTIONS.map(s => (
            <button key={s.id} className={`nav-btn ${activeSection === s.id ? "active" : ""}`} onClick={() => setActiveSection(s.id)}>
              {s.label}
            </button>
          ))}
        </nav>

        <main className="main">

          {activeSection === "overview" && (
            <div>
              <h2 className="section-heading">What is an NPP HCP Interview?</h2>
              <div className="card">
                <p style={{ fontSize: 14, lineHeight: 1.85, color: "#333", marginBottom: 12 }}>
                  An <strong>NPP HCP Interview</strong> is a structured qualitative research conversation conducted with physicians, typically during Phase 1–2 of a drug's development. The goal is NOT to promote — it is to generate commercial intelligence that shapes the Target Product Profile (TPP), label strategy, clinical trial design, and launch positioning.
                </p>
                <p style={{ fontSize: 14, lineHeight: 1.85, color: "#333" }}>
                  For <strong>ComboX</strong>, the primary objective is to understand how neurologists, pain specialists, and PCPs currently manage acute pain and PNP patients — and to test specific hypotheses about dosing, titration, and product profile appeal.
                </p>
              </div>

              <div className="card-grid">
                {[
                  { title: "👥 Who you interview", body: "Neurologists, pain specialists, PCPs who treat neuropathic pain. Aim for 8–12 per segment. Mix of high- and low-volume prescribers." },
                  { title: "⏱️ Interview length", body: "45–60 minutes. Qualitative depth interviews (IDIs). Usually 1:1 — not a group/advisory board format." },
                  { title: "📄 What you show them", body: "A written TPP or label concept card. Never verbal only. Written stimulus forces them to engage with specific wording." },
                  { title: "📐 What you're measuring", body: "Unmet need, concept appeal, dosing preference, barriers to adoption, and adoption intent (1–10 scale)." },
                ].map((c, i) => (
                  <div key={i} className="card">
                    <div className="card-title">{c.title}</div>
                    <div className="card-body">{c.body}</div>
                  </div>
                ))}
              </div>

              <div className="alert alert-yellow">
                <div className="alert-title">⚠️ The Golden Rule</div>
                <p><strong>Always understand their world before showing your product.</strong> Spend the first half of the interview in the HCP's current clinical reality — treatment decisions, frustrations, patient types. If you lead with the TPP, you get reactive feedback. If you surface unmet needs first, you get insight that shapes the entire commercial strategy.</p>
              </div>
            </div>
          )}

          {activeSection === "structure" && (
            <div>
              <h2 className="section-heading">Interview Structure</h2>
              {[
                { phase: "1", title: "Warm-Up & Screener", time: "5 min", color: "#e8f4fd", items: ["Set confidentiality expectations", "Confirm HCP profile (specialty, patient volume)", "Build rapport — they need to trust you before they'll be candid"] },
                { phase: "2", title: "Current Practice & Unmet Need", time: "10–12 min", color: "#f0fdf4", items: ["How do they manage acute pain / PNP today?", "First-line choices and why", "'Magic wand' — if they could design the ideal drug", "Listen for unmet needs mentioned UNPROMPTED"] },
                { phase: "3", title: "TPP Concept Reaction", time: "12–15 min", color: "#fef9c3", items: ["Show written TPP card — let them read it silently first", "Open reaction: 'What's your initial thought?'", "Appeal ceiling: 'Setting concerns aside, what excites you?'", "Barriers: 'What would need to be true for you to prescribe this?'"] },
                { phase: "4", title: "Dosing & Label Deep Dive", time: "10 min", color: "#fdf4ff", items: ["Show Label Version A (fixed QD) and Version B (titration)", "Force preference: 'Which would you choose for [specific patient type]?'", "Probe: 'When would you uptitrate vs. hold vs. stop?'", "Patient communication: 'How would you explain this to your patient?'"] },
                { phase: "5", title: "Adoption Intent & Close", time: "5 min", color: "#fff1f2", items: ["1–10 adoption intent scale", "'What would move that number up?'", "Open close: 'Anything we haven't covered that's important?'", "Thank and next steps"] },
              ].map((phase, i) => (
                <div key={i} className="phase-block" style={{ background: phase.color }}>
                  <div className="phase-block-header">
                    <div className="phase-block-title">Phase {phase.phase}: {phase.title}</div>
                    <span className="time-badge">{phase.time}</span>
                  </div>
                  {phase.items.map((item, j) => (
                    <div key={j} className="phase-item">
                      <span className="phase-item-dot">›</span>
                      <div className="phase-item-text">{item}</div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          {activeSection === "mock" && (
            <div>
              <h2 className="section-heading">Mock Interview — Full Example</h2>
              <p className="section-sub">Hypothetical respondent: Dr. Chen, Neurologist, ~25 PNP patients/month.<br />Click any exchange to reveal the moderator's internal annotation.</p>

              {MOCK_INTERVIEW.map((phase, pi) => (
                <div key={pi} className="mock-phase">
                  <div className="mock-phase-header" style={{ background: phase.color, borderColor: phase.border }}>
                    <div className="mock-phase-title">{phase.label}</div>
                    <div className="mock-phase-purpose">Purpose: {phase.purpose}</div>
                  </div>

                  {phase.exchanges.map((ex, ei) => {
                    const key = `${pi}-${ei}`;
                    const isOpen = expandedExchange === key;
                    const isMod = ex.role.startsWith("Moderator");
                    return (
                      <div key={ei} className={`exchange-card ${ex.annotation ? "clickable" : ""}`} onClick={() => ex.annotation && setExpandedExchange(isOpen ? null : key)}>
                        <div className={`role-bar ${isMod ? "role-moderator" : "role-hcp"}`}>
                          {ex.role}
                          {ex.annotation && <span className="hint">· click to see annotation</span>}
                        </div>
                        <div className="speech">{ex.text}</div>
                        {isOpen && ex.annotation && <div className="annotation-bar">📌 {ex.annotation}</div>}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          )}

          {activeSection === "probes" && (
            <div>
              <h2 className="section-heading">Probing Techniques</h2>
              <p className="section-sub">The difference between a good and great NPP interview is what happens AFTER the initial answer.</p>

              {PROBING_TECHNIQUES.map((t, i) => (
                <div key={i} className="technique-card">
                  <span className="technique-tag">{t.name}</span>
                  <div>
                    <div className="technique-example">"{t.example}"</div>
                    <div className="technique-when"><strong>When to use:</strong> {t.when}</div>
                  </div>
                </div>
              ))}

              <div className="alert alert-yellow" style={{ marginTop: 16 }}>
                <div className="alert-title">Things to NEVER do in an HCP interview</div>
                <ul className="dont-list">
                  {[
                    "Lead with your hypothesis ('Most doctors tell us they prefer once-daily dosing — do you agree?')",
                    "Argue with or correct the HCP, even if they say something clinically inaccurate",
                    "Fill silence too quickly — pause after an answer. The best insights come in the 'afterthought'",
                    "Move on before you've fully explored a topic. If it seems important, probe it.",
                    "Ask two questions in one sentence — the HCP will only answer one",
                  ].map((item, i) => (
                    <li key={i}><span className="x">✗</span>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeSection === "analysis" && (
            <div>
              <h2 className="section-heading">What to Do with Insights</h2>
              <p className="section-sub">After 8–12 interviews, synthesize findings into these six categories.</p>

              {ANALYSIS_FRAMEWORK.map((item, i) => (
                <div key={i} className="analysis-card">
                  <div className="analysis-category">{item.category}</div>
                  <div className="analysis-question"><strong>Key question:</strong> {item.question}</div>
                  <div className="analysis-why"><strong>Why it matters:</strong> {item.why}</div>
                </div>
              ))}

              <div className="card" style={{ marginTop: 16 }}>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 10 }}>From Insights → Action Item</div>
                <div style={{ fontSize: 13, color: "#444", lineHeight: 1.8 }}>The HCP interview findings feed directly back into the label wording decision. After 8–12 interviews, the team should be able to answer:</div>
                <ul className="action-list">
                  {[
                    "Did HCPs prefer fixed QD (Version A) or the titration algorithm (Version B)?",
                    "Which patient type drove each preference? (acute vs. PNP, post-failure vs. naïve)",
                    "What language in the label wording caused confusion or concern?",
                    "Is the 14-day acute pain duration limit acceptable or a barrier?",
                    "What's the uptitration threshold HCPs would actually use in practice?",
                  ].map((q, i) => (
                    <li key={i}><span className="arrow">→</span>{q}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
