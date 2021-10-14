declare const HtmlInput: import("vue/types/vue").ExtendedVue<{
    getElementCssClass(elementName?: string | undefined, defaultClasses?: import("../types/CssClass").default): import("../types/CssClass").default;
} & {
    componentClass: import("../types/CssClass").default;
    activeVariant: string | undefined;
} & {
    classes: any;
    fixedClasses: any;
    variants: any;
    variant: any;
} & import("vue").default, unknown, unknown, unknown, {
    id: string;
    name: string;
    disabled: boolean;
    readonly: boolean;
    autofocus: boolean;
    required: boolean;
    tabindex: string | number;
}>;
export default HtmlInput;
