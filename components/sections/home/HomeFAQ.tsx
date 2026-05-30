'use client'

import Link from 'next/link'
import Section from '@/components/ui/Section'
import Container from '@/components/ui/Container'
import Stack from '@/components/ui/Stack'
import Eyebrow from '@/components/ui/Eyebrow'
import Heading from '@/components/ui/Heading'
import Body from '@/components/ui/Body'
import Button from '@/components/ui/Button'
import { Accordion, AccordionItem } from '@/components/ui/Accordion'
import { FadeUp } from '@/components/motion/FadeUp'
import { SplitText } from '@/components/motion/SplitText'
import { FAQS } from '@/content/faq'

/**
 * HomeFAQ — 8 questions with FAQPage JSON-LD schema for featured snippets.
 */
export default function HomeFAQ() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  }

  return (
    <Section surface="cream" spacing="default" aria-labelledby="faq-heading" className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Container width="wide">
        <FadeUp>
          <div className="mb-14 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Stack gap="6">
                <Eyebrow tone="champagne" withRule>
                  Straight answers
                </Eyebrow>
                <Heading as="h2" id="faq-heading" variant="display-xl" balance>
                  <SplitText>Questions, answered.</SplitText>
                </Heading>
                <Body variant="body-l" className="text-charcoal/80 max-w-[44ch]">
                  The questions we get most often. If yours isn't here, message the team — every booking has a free-text field and we read every one.
                </Body>
                <div className="hidden pt-2 lg:block">
                  <Button as={Link} href="/book" variant="primary-light" data-magnetic className="bg-olive-deep border-olive-deep text-cream hover:bg-olive hover:border-olive">
                    See my price
                  </Button>
                </div>
              </Stack>
            </div>

            <div className="lg:col-span-7">
              <div className="border-t border-charcoal">
                <Accordion mode="single">
                  {FAQS.map((f, i) => (
                    <AccordionItem
                      key={f.question}
                      id={`faq-${i}`}
                      question={
                        <span className="font-display text-[18px] font-semibold leading-[1.3] tracking-[-0.01em] text-charcoal sm:text-[20px] lg:text-[22px]">
                          {f.question}
                        </span>
                      }
                    >
                      <Body variant="body" className="text-charcoal/80" measure>
                        {f.answer}
                      </Body>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>
        </FadeUp>

        <div className="mt-10 flex justify-center lg:hidden">
          <Button as={Link} href="/book" variant="primary-light" className="bg-olive-deep border-olive-deep text-cream hover:bg-olive hover:border-olive">
            See my price
          </Button>
        </div>
      </Container>
    </Section>
  )
}
