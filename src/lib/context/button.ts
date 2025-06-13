import type {
    ButtonColor,
    ButtonShape,
    ButtonSize,
    ButtonVariant,
    IconButtonWidth,
} from "$lib/types/button.js";

import { getContext, setContext } from "svelte";

export const BUTTON_TOGGLE_GROUP = "button.toggle-group";

export const BUTTON_COLOR = "button.color";
export const BUTTON_SHAPE = "button.shape";
export const BUTTON_SIZE = "button.size";
export const BUTTON_VARIANT = "button.variant";

export const ICON_BUTTON_WIDTH = "icon-button.width";

export const setToggleButtonGroup = () => setContext(BUTTON_TOGGLE_GROUP, true);

export const isInToggleButtonGroup = () =>
    !!getContext<boolean>(BUTTON_TOGGLE_GROUP);

export const setButtonColor = (color?: ButtonColor) =>
    color && setContext(BUTTON_COLOR, color);

export const getButtonColor = () =>
    getContext<ButtonColor | undefined>(BUTTON_COLOR);

export const setButtonShape = (shape?: ButtonShape) =>
    shape && setContext(BUTTON_SHAPE, shape);

export const getButtonShape = () =>
    getContext<ButtonShape | undefined>(BUTTON_SHAPE);

export const setButtonSize = (size?: ButtonSize) =>
    size && setContext(BUTTON_SIZE, size);

export const getButtonSize = () =>
    getContext<ButtonSize | undefined>(BUTTON_SIZE);

export const setButtonVariant = (variant?: ButtonVariant) =>
    variant && setContext(BUTTON_VARIANT, variant);

export const getButtonVariant = () =>
    getContext<ButtonVariant | undefined>(BUTTON_VARIANT);

export const setIconButtonWidth = (width?: IconButtonWidth) =>
    width && setContext(ICON_BUTTON_WIDTH, width);

export const getIconButtonWidth = () =>
    getContext<IconButtonWidth | undefined>(ICON_BUTTON_WIDTH);
