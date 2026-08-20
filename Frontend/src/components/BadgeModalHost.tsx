"use client";
import {
  fairData,
} from "@/data/fairData";
import {
  useFairSession,
} from "@/context/FairSessionContext";
import BadgeModal from "@/components/BadgeModal";

export default function BadgeModalHost() {
  const {
    unlockedBadgeId,
    closeBadgeModal,
  } =
    useFairSession();

  if (
    !unlockedBadgeId
  ) {
    return null;
  }

  const badge =
    fairData.areas
      .flatMap(
        (area) =>
          area.topics ??
          []
      )
      .map(
        (topic) =>
          topic.badge
      )
      .find(
        (
          currentBadge
        ) =>
          currentBadge.id ===
          unlockedBadgeId
      );

  if (!badge) {
    return null;
  }

  return (
    <BadgeModal
      badge={
        badge
      }
      onClose={
        closeBadgeModal
      }
    />
  );
}