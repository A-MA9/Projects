# 🗣️ Debate Coach Companion

An interactive **AI-powered debate coach and companion** built with **Streamlit**, **CrewAI** multi-agent framework, and **Gemini LLM**.

The app simulates a **mock debate** between a user and an AI opponent. It also provides:

* Opening arguments
* Opponent rebuttals
* Fact-checking
* Style & delivery feedback

Perfect for practicing debate structure, sharpening arguments, and improving communication.

---

## 🚀 Features

* 🎤 **Mock Debate Mode** – Enter a debate topic and argue as *Pro* or *Con*.
* 🤖 **Multi-Agent AI** – Different agents handle research, argumentation, rebuttals, fact-checking, and coaching.
* 📑 **Transcript View** – Keep track of the full debate flow.
* 🔍 **RAG Integration (Optional)** – Enhance fact-checking with external knowledge sources.
* 🎭 **Coaching Agent** – Provides style and delivery tips.

---

## 🛠️ Tech Stack

* [Streamlit](https://streamlit.io/) – Frontend UI
* [CrewAI](https://github.com/joaomdmoura/crewai) – Multi-agent orchestration
* [Google Gemini](https://ai.google.dev/) – LLM for argument generation
* Python 3.10+

---

## 📦 Installation

1. **Clone this repo**

   ```bash
   git clone https://github.com/sedulous/debate_coach.git
   cd debate_coach
   ```

2. **Create and activate a virtual environment**

   ```bash
   python -m venv myenv
   source myenv/bin/activate      # Mac/Linux
   myenv\Scripts\activate         # Windows
   ```

3. **Install dependencies**

   ```bash
   pip install -r requirements.txt
   ```

4. **Set your Gemini API key**

   ```bash
   export GEMINI_API_KEY="your_api_key_here"     # Mac/Linux
   set GEMINI_API_KEY="your_api_key_here"        # Windows
   ```

---

## ▶️ Usage

Run the Streamlit app:

```bash
streamlit run debate_coach_app.py
```

Open your browser at `http://localhost:8501` to access the Debate Coach.

---

## 📂 Project Structure

```
debate_coach/
│── debate_coach_app.py     # Main Streamlit app
│── requirements.txt        # Dependencies
│── README.md               # Documentation
│── myenv/                  # Virtual environment (optional)
```

---

## ⚡ Example Flow

1. Enter a debate topic (e.g., *"Should AI replace teachers?"*).
2. Choose your side (*Pro* or *Con*).
3. The AI generates:

   * Your side’s opening argument
   * Opponent rebuttal
   * Fact-checking summary
   * Style & delivery coaching
4. View the full transcript and improve your debate skills.

---

## 📌 Future Enhancements

* Live multi-turn debates (back-and-forth rounds)
* More advanced fact-checking with external knowledge sources (RAG)
* Debate scoring system
* Multiplayer mode with two human participants + AI judge

---

## 🤝 Contributing

Pull requests and feature suggestions are welcome!

---

## 📜 License

MIT License – feel free to use and modify.

---
