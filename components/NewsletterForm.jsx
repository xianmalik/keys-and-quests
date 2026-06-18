'use client'

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function NewsletterForm() {
  const [email, setEmail] = useState("")
  const [submittedEmail, setSubmittedEmail] = useState(null)

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!email) return

    // No newsletter provider is wired up yet — this just confirms the
    // submission in the UI until an actual email service is connected.
    setSubmittedEmail(email)
    setEmail("")
  }

  if (submittedEmail) {
    return (
      <p className="text-sm font-medium text-gray-700">
        Thanks! We&apos;ll be in touch at {submittedEmail}.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <Input
        type="email"
        required
        placeholder="you@email.com"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        className="rounded-none border-2 border-black bg-white shadow-retro focus-visible:ring-0"
      />
      <Button type="submit" variant="retro" className="bg-yellow-200">
        Subscribe
      </Button>
    </form>
  )
}
