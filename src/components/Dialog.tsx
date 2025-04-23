import { Dialog as HeadlessUIDialog, Transition } from "@headlessui/react";
import { Fragment, FunctionComponent, ReactNode } from "react";

type DialogProps = {
  children: ReactNode;
  isOpen: boolean;
  onClose?: () => void;
};

export const Dialog: FunctionComponent<DialogProps> = ({
  children,
  isOpen,
  onClose,
}) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <HeadlessUIDialog
        as="div"
        className="relative z-10"
        onClose={onClose || (() => {})}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full w-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <HeadlessUIDialog.Panel className="w-full max-w-250 transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                {children}
              </HeadlessUIDialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </HeadlessUIDialog>
    </Transition>
  );
};
