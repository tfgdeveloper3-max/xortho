// ── Cloudinary helper ──────────────────────────────────────
const CLOUD = "di7znsrrr";
const BASE = `https://res.cloudinary.com/${CLOUD}`;

export function cldImg(path: string) {
    return `${BASE}/image/upload/${path}`;
}

export function cldVideo(path: string) {
    return `${BASE}/video/upload/${path}`;
}

// ── Pre-built URLs ─────────────────────────────────────────
export const CLD = {
    // Root images
    xo: cldImg("XO"),
    xo2: cldImg("XO2"),
    logo: cldImg("logo"),
    footerLogo: cldImg("footer-logo"),

    xoBootShort: cldImg("xo-boot-short"),
    xoBootTall: cldImg("xo-boot-tall"),
    xoBackSupport: cldImg("xo-back"),
    xoKneeHinged: cldImg("xo-knee-hinged"),

    // Leg / Xboot
    shoe: cldImg("shoe"),
    legNormal: cldImg("leg-normal"),
    legPain: cldImg("leg-pain"),
    legHealed: cldImg("leg-healed"),

    // Belt / Back support
    backBelt: cldImg("back-belt3"),
    backNormal: cldImg("back-normal"),
    backPain: cldImg("back-pain"),
    backHealed: cldImg("back-healed"),

    // Knee brace
    kneeBrace: cldImg("knee-brace?_v=2"),
    kneeNormal: cldImg("knee-normal"),
    kneePain: cldImg("knee-pain"),
    kneeHealed: cldImg("knee-healed"),

    // Belt detail images
    backBeltBlueprint: cldImg("back-belt-blueprint"),
    backBeltSide: cldImg("back-belt-side"),
    backBeltFront: cldImg("back-belt-front"),
    backBeltWorn: cldImg("back-belt-worn"),

    // Knee brace detail images
    kneeBraceBlueprint: cldImg("knee-brace-blueprint"),
    kneeBraceSide: cldImg("knee-brace-side"),
    kneeBraceStrap: cldImg("knee-brace-strap"),
    kneeBraceWorn: cldImg("knee-brace-worn"),

    // Xboot detail images
    xbootBothSide: cldImg("XO_Both_Side_View_1_2"),
    xbootToeGuard: cldImg("XO_Toe_Guard_2_1"),
    xbootBottom: cldImg("XO_Boot_High_Top_New_bottom_2_1"),
    xbootLowRocker: cldImg("XO_Low_Rocker_Bottom_4_1"),
    bootProduct: cldImg("boot_product"),
    bootBlueprint: cldImg("blue_print"),

    // Videos
    heroBg: cldVideo("Hero-Bg"),
    sectionhero: cldVideo("section_hero"),
    trust: cldVideo("Trust"),
    productPreview: cldVideo("Product-Preview"),


    // Xboot real product images
    xoStraps: cldImg("straps"),
    xoCage: cldImg("cage"),
    xoEzBulb: cldImg("EZ-Bulb"),
    xoFrontView: cldImg("Front-View"),
    xoFullBoot: cldImg("Full-Boot"),
    xoGripTips: cldImg("Grip-Tips"),
    xoInsole: cldImg("Insole"),
    xoLiner: cldImg("Liner"),
    xoRevolutionary: cldImg("Revolutionary"),
    xoRocker: cldImg("Rocker"),
    xoShell: cldImg("Shell"),
    sleeves: cldImg("sleeves"),
    XoBootHero: cldImg("XoBoot-Hero"),

    // Knee support real product images
    kneeSleeve: cldImg("knee-sleeve"),
    kneeFront: cldImg("knee-front"),
    kneeHinge1: cldImg("knee-hinge-1"),
    kneeHinge2: cldImg("knee-hinge-2"),
    kneeStrap1: cldImg("knee-strap-1"),
    kneeBlueprint: cldImg("knee-blueprint"),
    kneeCryoPad: cldImg("knee-cryo-pad"),
    kneeProduct2: cldImg("knee-product-2"),
    kneeOpen: cldImg("knee-open"),
    kneeHingeSingle: cldImg("knee-hinge-single"),
};