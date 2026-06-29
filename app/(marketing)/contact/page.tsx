import { CtaBand } from "@/components/blocks"
import { ContactForm } from "@/components/forms/contact-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, MapPin, Phone } from "lucide-react"

export default function MarketingContactPage() {
  return (
    <>
      <section className="nimbus-section-sm">
        <div className="nimbus-container max-w-3xl space-y-4">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            Contact
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Let&apos;s start a conversation
          </h1>
          <p className="text-lg text-muted-foreground">
            Tell us about your project. We typically respond within one business
            day.
          </p>
        </div>
      </section>

      <section className="nimbus-section-sm pt-0">
        <div className="nimbus-container grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-4">
            {[
              { icon: Phone, label: "Phone", value: "+98 (7765) 3422" },
              { icon: Mail, label: "Email", value: "chat@nimbus.app" },
              { icon: MapPin, label: "Office", value: "San Francisco, CA" },
            ].map((item) => (
              <Card key={item.label}>
                <CardHeader className="flex-row items-center gap-3 space-y-0">
                  <item.icon className="size-5 text-primary" />
                  <CardTitle className="text-base">{item.label}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{item.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Send a message</CardTitle>
            </CardHeader>
            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
