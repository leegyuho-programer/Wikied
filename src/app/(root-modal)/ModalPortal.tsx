import { ReactNode, useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type PortalProps = {
  children: ReactNode;
  container?: Element | DocumentFragment | null;
};

function ModalPortal({ children, container }: PortalProps) {
  const [mountNode, setMountNode] = useState<Element | DocumentFragment | null>(null);

  useLayoutEffect(() => {
    const el = document.getElementById('modal') as HTMLElement;
    setMountNode(container || el);
  }, [container]);

  return mountNode ? createPortal(children, mountNode) : null;
}

export default ModalPortal;
