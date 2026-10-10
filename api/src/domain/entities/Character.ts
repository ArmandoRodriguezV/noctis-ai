export type PersonalityType = "Funny" | "Serious" | "Shy";

export interface Character {
    type: PersonalityType;
    character: string;
}