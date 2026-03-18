import { RefObject, useEffect } from "react";

type DismissRef = RefObject<HTMLElement | null>;

type UseDismissOnPointerDownOptions = {
  enabled: boolean;
  refs: DismissRef[];
  onDismiss: () => void;
};

export const useDismissOnPointerDown = ({
  enabled,
  refs,
  onDismiss,
}: UseDismissOnPointerDownOptions) => {
  useEffect(() => {
    if (!enabled) return;

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (!target) return;

      const interactedInside = refs.some((ref) => ref.current?.contains(target));
      if (!interactedInside) {
        onDismiss();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [enabled, onDismiss, refs]);
};
