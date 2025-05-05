export interface ModalProps {
  readonly setAnswer: (answer: string) => void;
  readonly text: string;
  readonly setOpen: (open: boolean) => void;
  readonly setDropdown?: (dropdown: boolean) => void;
}
export const CLASSNAME = {
  TEXT: 'modal_text',
  WRAPPER: 'modal_wrapper',
  BUTTON: 'modal_button',
  YES: 'modal_yes',
  NO: 'modal_no',
  CONTENT: 'modal-content',
};
export const TEXT = {
  YES: 'Yes',
  NO: 'No',
};
