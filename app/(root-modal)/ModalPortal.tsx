import { ReactNode, useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type PortalProps = {
  children: ReactNode;
  container?: Element | DocumentFragment | null;
};

function ModalPortal({ children, container }: PortalProps) {
  const [mountNode, setMountNode] = useState<Element | DocumentFragment | null>(null);
  const el = document.getElementById('modal') as HTMLElement;

  useLayoutEffect(() => {
    setMountNode(container || el);
  }, [container]);

  return mountNode ? createPortal(children, mountNode) : mountNode;
}

export default ModalPortal;
