import { BUSINESS_CONFIG } from '../../content/business-config'
import { publicFacts } from '../../content/knowledge'
import { SERVICE_CATALOGUE, getService } from '../../content/service-catalogue'
import { PACKAGES, getPackage } from '../../content/packages'
import { FEATURES } from '../../content/features'
import { leadService } from './lead-service'
export const CONVERSATION_POLICY = { persistTranscripts: false, clientPersistence: false, summaryRequiresConsent: true, retention: 'pending', redactBeforeLogging: true } as const
export const AI_TOOL_PERMISSIONS = { knowledge: true, serviceLookup: true, packageLookup: true, leadCapture: false, confirmBooking: false, sendEmail: false, callPhone: false } as const
export interface HandoffRequest { channel: 'ai-chat' | 'ai-voice' | 'callback'; reason: string; durableLeadId?: string }
export interface HandoffAdapter { requestHandoff(request: HandoffRequest): Promise<'unavailable' | 'queued'> }
export const assistantKnowledge = {
  business: BUSINESS_CONFIG, services: SERVICE_CATALOGUE, packages: PACKAGES,
  retrieve: publicFacts, serviceLookup: getService, packageLookup: getPackage,
}
// Same lead service, gated before use. No model, recording, telephony or autonomous tools.
export async function captureAssistantLead(input: unknown) {
  if (!FEATURES.aiChat || !AI_TOOL_PERMISSIONS.leadCapture) return { status: 'unavailable' as const, message: 'Assistant lead capture is not configured.' }
  return leadService.submitLead(input)
}
