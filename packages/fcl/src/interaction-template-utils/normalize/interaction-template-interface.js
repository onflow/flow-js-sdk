export function normalizeInteractionTemplateInterface(templateInterface) {
    if (templateInterface == null) return null

    switch (templateInterface["f_vsn"]) {
        case "1.0.0":
            return templateInterface

        default:
            throw new Error("normalizeInteractionTemplateInterface Error: Invalid InteractionTemplateInterface")
    }
}
  