export interface ModalProps {
  setAnswer: (answer: string) => void;
  text: string;
  setOpen: (open: boolean) => void;
  setDropdown?: (dropdown: boolean) => void;
  onConfirm?: () => void;
}
export const CLASSNAME = {
  TEXT: 'modal_text',
  WRAPPER: 'modal_wrapper',
  BUTTON: 'modal_button',
  YES: "modal_yes",
  NO: "modal_no",
  CONTENT: "modal-content"
};
export const TEXT = {
  YES: 'Yes',
  NO: 'No',
};
