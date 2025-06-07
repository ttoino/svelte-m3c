import type {
    ButtonColor,
    ButtonShape,
    ButtonSize,
    ButtonVariant,
    IconButtonWidth,
} from "$lib/types/button.js";

import { getContext, setContext } from "svelte";

export const BUTTON_GROUP = "button.group";

export const BUTTON_COLOR = "button.color";
export const BUTTON_SHAPE = "button.shape";
export const BUTTON_SIZE = "button.size";
export const BUTTON_VARIANT = "button.variant";

export const ICON_BUTTON_WIDTH = "icon-button.width";

export const setButtonGroup = () => setContext(BUTTON_GROUP, true);

export const isInButtonGroup = () => !!getContext<boolean>(BUTTON_GROUP);

export const setButtonColor = (color: ButtonColor) =>
    setContext(BUTTON_COLOR, color);

export const getButtonColor = () =>
    getContext<ButtonColor | undefined>(BUTTON_COLOR);

export const setButtonShape = (shape: ButtonShape) =>
    setContext(BUTTON_SHAPE, shape);

export const getButtonShape = () =>
    getContext<ButtonShape | undefined>(BUTTON_SHAPE);

export const setButtonSize = (size: ButtonSize) =>
    setContext(BUTTON_SIZE, size);

export const getButtonSize = () =>
    getContext<ButtonSize | undefined>(BUTTON_SIZE);

export const setButtonVariant = (variant: ButtonVariant) =>
    setContext(BUTTON_VARIANT, variant);

export const getButtonVariant = () =>
    getContext<ButtonVariant | undefined>(BUTTON_VARIANT);

export const setIconButtonWidth = (width: IconButtonWidth) =>
    setContext(ICON_BUTTON_WIDTH, width);

export const getIconButtonWidth = () =>
    getContext<IconButtonWidth | undefined>(ICON_BUTTON_WIDTH);
