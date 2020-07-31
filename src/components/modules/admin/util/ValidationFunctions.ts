import { Conditions } from "../AdminInterfaces";

export function textFieldValidator
    (value: string, conditions?: Conditions): string[] | null {
    let messages: string[] = [];
    if (!conditions || value === undefined || value === null  || value.length === 0 && conditions.allowEmpty) {
        return null;
    }

    if (value.length === 0) {
        messages.push("Should not be empty");
    }
    if (conditions.beginUppercase) {
        const pattern = /^\p{Lu}.*$/u; // u = unicode
        if (!pattern.test(value)) {
            messages.push("Should begin with uppercase");
        }
    }

    if (conditions.max && (value.length < conditions.min || value.length > conditions.max)) {
        messages.push(`length must be between ${conditions.min} and ${conditions.max}`)
    } else if (value.length < conditions.min) {
        messages.push(`minimum ${conditions.min} characaters required`)
    }

    return messages.length > 0 ? messages : null;
}