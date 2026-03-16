'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'

/* ── questions from USCIS civics test ────────────────────────────────── */

interface Question {
  id: number
  question: string
  choices: string[]
  correctIndex: number
  explanation: string
  category: string
}

const questions: Question[] = [
  { id: 1, question: 'What is the supreme law of the land?', choices: ['The Bill of Rights', 'The Declaration of Independence', 'The Constitution', 'The Articles of Confederation'], correctIndex: 2, explanation: 'The Constitution is the supreme law of the land. It establishes the framework of the federal government and the rights of citizens.', category: 'American Government' },
  { id: 2, question: 'What does the Constitution do?', choices: ['Sets up the government, defines the government, protects basic rights', 'Declares independence from Britain', 'Establishes state governments', 'Creates the military'], correctIndex: 0, explanation: 'The Constitution sets up the government, defines the government, and protects basic rights of Americans.', category: 'American Government' },
  { id: 3, question: 'The idea of self-government is in the first three words of the Constitution. What are these words?', choices: ['Congress shall make', 'In order to', 'We the People', 'United States of'], correctIndex: 2, explanation: '"We the People" establishes that the government\'s power comes from the people — the principle of popular sovereignty.', category: 'American Government' },
  { id: 4, question: 'What is an amendment?', choices: ['A new law', 'A change or addition to the Constitution', 'A presidential order', 'A Supreme Court ruling'], correctIndex: 1, explanation: 'An amendment is a change or addition to the Constitution. The amendment process is outlined in Article V.', category: 'American Government' },
  { id: 5, question: 'How many amendments does the Constitution have?', choices: ['10', '21', '25', '27'], correctIndex: 3, explanation: 'The Constitution has 27 amendments. The first 10 are called the Bill of Rights (1791), and the most recent (27th) was ratified in 1992.', category: 'American Government' },
  { id: 6, question: 'What are two rights in the Declaration of Independence?', choices: ['Life and pursuit of happiness', 'Right to bear arms and free speech', 'Right to vote and right to work', 'Freedom of religion and right to trial'], correctIndex: 0, explanation: 'The Declaration of Independence lists "Life, Liberty and the pursuit of Happiness" as unalienable rights.', category: 'American Government' },
  { id: 7, question: 'What is freedom of religion?', choices: ['You must follow the state religion', 'You can practice any religion, or not practice a religion', 'You must register your religion', 'Religion is banned in public'], correctIndex: 1, explanation: 'Freedom of religion means you can practice any religion, or not practice a religion. This is guaranteed by the First Amendment.', category: 'Rights and Responsibilities' },
  { id: 8, question: 'What is the economic system in the United States?', choices: ['Communist economy', 'Socialist economy', 'Capitalist/market economy', 'Command economy'], correctIndex: 2, explanation: 'The United States has a capitalist economy, also called a free market economy or market economy.', category: 'American Government' },
  { id: 9, question: 'What is the "rule of law"?', choices: ['The president makes all laws', 'Everyone must follow the law', 'Laws only apply to citizens', 'States can ignore federal law'], correctIndex: 1, explanation: 'The rule of law means everyone must follow the law — leaders must obey the law, government must obey the law, and no one is above the law.', category: 'American Government' },
  { id: 10, question: 'What are the two parts of the U.S. Congress?', choices: ['The Senate and the House of Representatives', 'The Senate and the Supreme Court', 'The President and the Senate', 'The House and the Cabinet'], correctIndex: 0, explanation: 'Congress is made up of the Senate (100 members) and the House of Representatives (435 members).', category: 'System of Government' },
  { id: 11, question: 'How many U.S. Senators are there?', choices: ['50', '100', '435', '535'], correctIndex: 1, explanation: 'There are 100 U.S. Senators — two from each of the 50 states.', category: 'System of Government' },
  { id: 12, question: 'We elect a U.S. Senator for how many years?', choices: ['2 years', '4 years', '6 years', '8 years'], correctIndex: 2, explanation: 'A U.S. Senator is elected for a 6-year term. Senate elections are staggered so roughly one-third are up for election every 2 years.', category: 'System of Government' },
  { id: 13, question: 'The House of Representatives has how many voting members?', choices: ['50', '100', '435', '535'], correctIndex: 2, explanation: 'The House has 435 voting members. The number of representatives per state is based on population.', category: 'System of Government' },
  { id: 14, question: 'We elect a U.S. Representative for how many years?', choices: ['2 years', '4 years', '6 years', '8 years'], correctIndex: 0, explanation: 'A U.S. Representative is elected for a 2-year term. All 435 seats are up for election every two years.', category: 'System of Government' },
  { id: 15, question: 'If both the President and Vice President can no longer serve, who becomes President?', choices: ['Secretary of State', 'President Pro Tempore of the Senate', 'Speaker of the House', 'Chief Justice'], correctIndex: 2, explanation: 'The Speaker of the House is third in the presidential line of succession, after the Vice President.', category: 'System of Government' },
  { id: 16, question: 'How many justices are on the Supreme Court?', choices: ['7', '9', '11', '12'], correctIndex: 1, explanation: 'There are 9 justices on the Supreme Court — one Chief Justice and eight Associate Justices.', category: 'System of Government' },
  { id: 17, question: 'What did the Emancipation Proclamation do?', choices: ['Ended World War I', 'Gave women the right to vote', 'Freed the slaves', 'Established national parks'], correctIndex: 2, explanation: 'The Emancipation Proclamation, issued by Lincoln in 1863, freed slaves in Confederate states. The 13th Amendment later abolished slavery nationwide.', category: 'American History' },
  { id: 18, question: 'What did Susan B. Anthony do?', choices: ['Founded the Red Cross', 'Fought for women\'s rights', 'Was the first female president', 'Wrote the Constitution'], correctIndex: 1, explanation: 'Susan B. Anthony was a leader of the women\'s suffrage movement, fighting for women\'s right to vote (achieved with the 19th Amendment in 1920).', category: 'American History' },
  { id: 19, question: 'What ocean is on the West Coast of the United States?', choices: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'], correctIndex: 3, explanation: 'The Pacific Ocean is on the West Coast of the United States.', category: 'Geography' },
  { id: 20, question: 'Why does the flag have 13 stripes?', choices: ['For the 13 original colonies', 'For the 13 original amendments', 'For the 13 founding fathers', 'For the 13 original states that ratified'], correctIndex: 0, explanation: 'The 13 stripes represent the 13 original colonies that declared independence from Britain and became the first states.', category: 'Symbols' },
]

/* ── component ───────────────────────────────────────────────────────── */

function QuizQuestion({
  q,
  selectedAnswer,
  onSelect,
  showResult,
}: {
  q: Question
  selectedAnswer: number | null
  onSelect: (idx: number) => void
  showResult: boolean
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
      <div className="flex items-start gap-3 mb-4">
        <span className="bg-primary/10 text-primary text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
          {q.id}
        </span>
        <div className="flex-1">
          <span className="text-xs text-gray-400 uppercase tracking-wide">{q.category}</span>
          <h3 className="text-lg font-bold mt-1">{q.question}</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
        {q.choices.map((choice, idx) => {
          let cls = 'border border-gray-200 rounded-lg px-4 py-3 text-sm cursor-pointer transition-all text-left w-full'
          if (showResult) {
            if (idx === q.correctIndex) cls = 'border-2 border-green-500 bg-green-50 rounded-lg px-4 py-3 text-sm text-left w-full'
            else if (idx === selectedAnswer && idx !== q.correctIndex)
              cls = 'border-2 border-red-500 bg-red-50 rounded-lg px-4 py-3 text-sm text-left w-full'
            else cls = 'border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-400 text-left w-full'
          } else if (idx === selectedAnswer) {
            cls = 'border-2 border-primary bg-primary/5 rounded-lg px-4 py-3 text-sm text-left w-full'
          } else {
            cls += ' hover:border-primary/50 hover:bg-gray-50'
          }

          return (
            <button
              key={idx}
              className={cls}
              onClick={() => !showResult && onSelect(idx)}
              disabled={showResult}
            >
              <span className="font-medium mr-2">{String.fromCharCode(65 + idx)}.</span>
              {choice}
            </button>
          )
        })}
      </div>

      {showResult && (
        <div className={`text-sm p-3 rounded-lg ${selectedAnswer === q.correctIndex ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
          {selectedAnswer === q.correctIndex ? '✅ Correct! ' : '❌ Incorrect. '}
          {q.explanation}
        </div>
      )}
    </div>
  )
}

function ResultCard({ score, total }: { score: number; total: number }) {
  const pct = Math.round((score / total) * 100)
  const passed = pct >= 60 // USCIS requires 6/10 (60%) on the actual test

  return (
    <div className={`border-2 rounded-xl p-8 text-center mb-8 ${passed ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}`}>
      <div className="text-6xl mb-4">{passed ? '🎉' : '📚'}</div>
      <h2 className="font-heading text-3xl font-bold mb-2">
        {passed ? 'You Passed!' : 'Not Quite — Keep Studying!'}
      </h2>
      <div className="text-5xl font-bold my-4">
        {score}/{total}
      </div>
      <p className="text-lg text-gray-700 mb-2">You scored {pct}%</p>
      <p className="text-gray-600 mb-6">
        {passed
          ? 'Congratulations! You answered enough questions correctly to pass the civics portion of the U.S. citizenship test. The actual test requires 6 out of 10 correct answers.'
          : 'The U.S. citizenship test requires a score of 60% (6 out of 10). You\'d need to study more before taking the actual test. Don\'t worry — most people need some preparation!'}
      </p>

      <div className="bg-white/60 rounded-lg p-4 mb-6">
        <h3 className="font-bold mb-2">📊 How Does This Compare?</h3>
        <p className="text-sm text-gray-700">
          The actual USCIS civics test asks 10 questions from a pool of 100, and you need 6 correct (60%) to pass.
          The overall pass rate is about <strong>91%</strong> for naturalization applicants — but studies show that only
          about <strong>36% of native-born Americans</strong> can pass the same test.
        </p>
      </div>

      <div className="bg-amber-50 border-l-4 border-amber-400 p-4 text-left rounded-r-lg">
        <h3 className="font-bold text-sm mb-1">💡 Libertarian Perspective</h3>
        <p className="text-sm text-gray-700">
          Should a civics quiz be a barrier to citizenship? The fact that most native-born Americans would fail
          this test raises a fundamental question: if we don&apos;t require existing citizens to demonstrate this
          knowledge, why require it of aspiring ones? Knowledge of government shouldn&apos;t be a prerequisite for
          the rights government is supposed to protect.
        </p>
      </div>
    </div>
  )
}

/* ── main page ───────────────────────────────────────────────────────── */

export default function CitizenshipTestPage() {
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [submitted, setSubmitted] = useState(false)

  const handleSelect = useCallback((questionId: number, choiceIndex: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: choiceIndex }))
  }, [])

  const handleSubmit = () => {
    setSubmitted(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleReset = () => {
    setAnswers({})
    setSubmitted(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const score = questions.filter((q) => answers[q.id] === q.correctIndex).length
  const allAnswered = Object.keys(answers).length === questions.length

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span className="mx-1">›</span>
        <span className="text-gray-700">Citizenship Test</span>
      </nav>

      <h1 className="font-heading text-4xl font-bold mb-4">U.S. Citizenship Practice Test</h1>
      <p className="text-lg text-gray-600 mb-2">
        Could you pass the U.S. citizenship test? Try these 20 questions from the actual USCIS civics exam
        that all naturalization applicants must pass.
      </p>
      <p className="text-gray-600 mb-8">
        The real test asks 10 random questions from a pool of 100, and you need at least 6 correct (60%) to pass.
        We&apos;re giving you 20 questions — answer them all, then see your score.
      </p>

      {/* Stats bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-primary">20</div>
          <div className="text-xs text-gray-600">Questions</div>
        </div>
        <div className="bg-success/5 border border-success/20 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-success">60%</div>
          <div className="text-xs text-gray-600">Passing Score</div>
        </div>
        <div className="bg-warning/5 border border-warning/20 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-warning">91%</div>
          <div className="text-xs text-gray-600">Applicant Pass Rate</div>
        </div>
        <div className="bg-danger/5 border border-danger/20 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-danger">36%</div>
          <div className="text-xs text-gray-600">Native-Born Pass Rate</div>
        </div>
      </div>

      {/* Results (if submitted) */}
      {submitted && <ResultCard score={score} total={questions.length} />}

      {/* Questions */}
      <div className="space-y-2">
        {questions.map((q) => (
          <QuizQuestion
            key={q.id}
            q={q}
            selectedAnswer={answers[q.id] ?? null}
            onSelect={(idx) => handleSelect(q.id, idx)}
            showResult={submitted}
          />
        ))}
      </div>

      {/* Submit / Reset */}
      <div className="mt-8 text-center">
        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={!allAnswered}
            className={`px-8 py-3 rounded-xl font-bold text-lg transition-all ${
              allAnswered
                ? 'bg-primary text-white hover:bg-primary/90 cursor-pointer'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {allAnswered ? 'Submit Answers' : `Answer All Questions (${Object.keys(answers).length}/${questions.length})`}
          </button>
        ) : (
          <button
            onClick={handleReset}
            className="px-8 py-3 rounded-xl font-bold text-lg bg-primary text-white hover:bg-primary/90 transition-all"
          >
            Try Again
          </button>
        )}
      </div>

      {/* About the Test */}
      <div className="mt-12 bg-gray-50 border border-gray-200 rounded-xl p-6">
        <h2 className="font-heading text-2xl font-bold mb-4">About the USCIS Citizenship Test</h2>
        <div className="text-sm text-gray-600 space-y-3">
          <p>
            The U.S. naturalization civics test is administered as part of the citizenship interview at a USCIS office.
            An officer asks up to 10 questions from a list of 100 civics questions, and the applicant must answer at
            least 6 correctly.
          </p>
          <p>
            Applicants who are 65 years or older and have been a permanent resident for at least 20 years are given
            a simplified version of 20 questions (marked with an asterisk on the official list).
          </p>
          <p>
            In addition to the civics test, applicants must demonstrate English language ability through reading,
            writing, and speaking tests. Some applicants may qualify for exemptions based on age and residency.
          </p>
          <h3 className="font-bold text-gray-700 pt-2">Test Categories</h3>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>American Government:</strong> Principles of American democracy, system of government, rights and responsibilities</li>
            <li><strong>American History:</strong> Colonial period, 1800s, recent American history</li>
            <li><strong>Integrated Civics:</strong> Geography, symbols, holidays</li>
          </ul>
        </div>
      </div>

      {/* How to Become a Citizen */}
      <div className="mt-6 bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="font-heading text-xl font-bold mb-3">Ready to Apply for Citizenship?</h2>
        <p className="text-sm text-gray-600 mb-4">
          The civics test is just one part of the naturalization process. Learn about the full path to becoming
          a U.S. citizen, including eligibility requirements, timelines, and costs.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/how-to-become-a-us-citizen" className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
            How to Become a Citizen →
          </Link>
          <Link href="/how-long-to-get-a-green-card" className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
            Green Card Wait Times →
          </Link>
          <Link href="/naturalization" className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
            Naturalization Data →
          </Link>
        </div>
      </div>
    </div>
  )
}
