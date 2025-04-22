import { prop } from "@typegoose/typegoose";

export class TranslatesSchema {
    /** Узбекский */
    @prop()
    uz?: string;

    /** Русский */
    @prop()
    ru?: string;

    /** Английский */
    @prop()
    en?: string;
}
