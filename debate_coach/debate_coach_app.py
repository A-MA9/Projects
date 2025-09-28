import streamlit as st
import os
from crewai import Agent, Task, Crew, Process, LLM
# from crewai.llms import Gemini

# -------------------------------
# LLM Setup (Gemini)
# -------------------------------
# Make sure you set your Gemini API key:
# export GEMINI_API_KEY="your_api_key_here"
llm = LLM(
    model="gemini/gemini-2.0-flash",
    temperature=0.9,
    api_key=os.environ["GOOGLE_API_KEY"]
)
# -------------------------------
# Define Agents
# -------------------------------
researcher = Agent(
    role="Researcher",
    goal="Find the strongest factual evidence for the given debate topic and side.",
    backstory="Expert in research, logic, and fact verification.",
    llm=llm,
    verbose=True
)

argument_generator = Agent(
    role="Argument Generator",
    goal="Build clear, persuasive opening arguments using provided evidence.",
    backstory="Seasoned debater skilled at persuasive delivery.",
    llm=llm,
    verbose=True
)

rebuttal_agent = Agent(
    role="Opponent Rebuttal Agent",
    goal="Generate logical rebuttals to challenge the given arguments.",
    backstory="Plays devil’s advocate to strengthen debate preparation.",
    llm=llm,
    verbose=True
)

fact_checker = Agent(
    role="Fact Checker",
    goal="Fact-check the arguments and highlight questionable or unsupported claims.",
    backstory="Critical analyst who ensures accuracy of information.",
    llm=llm,
    verbose=True
)

style_coach = Agent(
    role="Style Coach",
    goal="Give style and delivery feedback to improve clarity, persuasiveness, and timing.",
    backstory="Debate coach focusing on rhetoric, tone, and delivery.",
    llm=llm,
    verbose=True
)

# -------------------------------
# Streamlit UI
# -------------------------------
st.set_page_config(page_title="Debate Coach", page_icon="🎤", layout="wide")
st.title("🎤 Debate Coach & Companion")
st.markdown("Prepare, practice, and improve your debate skills with AI agents powered by CrewAI + Gemini.")

with st.sidebar:
    st.header("Debate Setup")
    topic = st.text_input("Debate Topic", "Universal Basic Income")
    side = st.radio("Choose Your Side", ["Pro", "Con"])
    run = st.button("Start Debate Coaching")

if "transcript" not in st.session_state:
    st.session_state.transcript = []

if run:
    # -------------------------------
    # Define Tasks
    # -------------------------------
    research_task = Task(
        description=f"Research strongest factual evidence supporting {side} side on '{topic}'.",
        agent=researcher,
        expected_output="A list of evidence, facts, and sources."
    )

    argument_task = Task(
        description=f"Generate 2-3 persuasive opening arguments for the {side} side using the evidence.",
        agent=argument_generator,
        expected_output="Structured list of strong opening arguments."
    )

    rebuttal_task = Task(
        description=f"Generate 2-3 rebuttals from the opposing side against the {side}'s arguments.",
        agent=rebuttal_agent,
        expected_output="List of rebuttal statements."
    )

    fact_check_task = Task(
        description="Fact-check the arguments for accuracy, flagging uncertain claims.",
        agent=fact_checker,
        expected_output="Fact-check summary with verdicts and confidence levels."
    )

    style_task = Task(
        description="Give style and delivery feedback for the opening arguments.",
        agent=style_coach,
        expected_output="Clarity, strength, and timing suggestions."
    )

    # -------------------------------
    # Crew Orchestration
    # -------------------------------
    crew = Crew(
        agents=[researcher, argument_generator, rebuttal_agent, fact_checker, style_coach],
        tasks=[research_task, argument_task, rebuttal_task, fact_check_task, style_task],
        process=Process.sequential,  # Run tasks in order
        verbose=True
    )

    with st.spinner("Running debate preparation..."):
        results = crew.kickoff()

    # -------------------------------
    # Display Results (ordered list)
    # -------------------------------

    # Individual sections (if preferred)
    st.subheader("🔍 Research Findings")
    st.write(results.tasks_output[0].raw)   # research_task is 1st
    st.subheader("📑 Opening Arguments")
    st.write(results.tasks_output[1].raw)   # argument_task is 2nd

    st.subheader("⚔️ Opponent Rebuttals")
    st.write(results.tasks_output[2].raw)   # rebuttal_task is 3rd

    st.subheader("🔍 Fact-Check Feedback")
    st.write(results.tasks_output[3].raw)   # fact_check_task is 4th

    st.subheader("🎭 Style Coaching")
    st.write(results.tasks_output[4].raw)   # style_task is 5th

    # Transcript panel
    st.session_state.transcript.append(
        {"role": side, "text": results.tasks_output[1].raw}
    )
    st.session_state.transcript.append(
        {"role": "Opponent", "text": results.tasks_output[2].raw}
    )


# Footer note
st.caption("Note: Gemini model & CrewAI usage may incur API costs. Inspect the outputs, and fact-check before using publicly.")

st.sidebar.subheader("Debate Transcript")
for turn in st.session_state.transcript:
    st.sidebar.write(f"**{turn['role']}**: {turn['text']}")
