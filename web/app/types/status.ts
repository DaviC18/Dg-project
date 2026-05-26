const statusValues = [
    "worse",
    "better",
    "same"
] as const

export type SymptomsStatus = (typeof statusValues)[number]