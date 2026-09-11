import {
  useRef,
} from "react";
import type {
  TouchEvent,
} from "react";

type SwipeNavigationOptions = {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  minDistance?: number;
};

export function useSwipeNavigation({
  onSwipeLeft,
  onSwipeRight,
  minDistance = 45,
}: SwipeNavigationOptions) {
  const touchStart =
    useRef<{
      x: number;
      y: number;
    } | null>(null);

  const handleTouchStart = (
    event: TouchEvent
  ) => {
    const touch =
      event.touches[0];

    touchStart.current = {
      x: touch.clientX,
      y: touch.clientY,
    };
  };

  const handleTouchEnd = (
    event: TouchEvent
  ) => {
    if (!touchStart.current) {
      return;
    }

    const touch =
      event.changedTouches[0];

    const deltaX =
      touch.clientX -
      touchStart.current.x;

    const deltaY =
      touch.clientY -
      touchStart.current.y;

    touchStart.current =
      null;

    const isHorizontalSwipe =
      Math.abs(deltaX) >=
        minDistance &&
      Math.abs(deltaX) >
        Math.abs(deltaY) * 1.25;

    if (!isHorizontalSwipe) {
      return;
    }

    if (deltaX < 0) {
      onSwipeLeft?.();
      return;
    }

    onSwipeRight?.();
  };

  return {
    onTouchStart:
      handleTouchStart,
    onTouchEnd:
      handleTouchEnd,
  };
}
