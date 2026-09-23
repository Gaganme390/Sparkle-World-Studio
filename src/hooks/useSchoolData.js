import { useState, useEffect, useMemo } from 'react';
import { schoolStore, isBirthdayToday, isBirthdayUpcoming } from '../utils/schoolStore';

export function useSchoolData() {
  const [data, setData] = useState(() => schoolStore.getState());

  useEffect(() => {
    const unsubscribe = schoolStore.subscribe((nextState) => {
      setData(nextState);
    });
    return unsubscribe;
  }, []);

  // Compute active birthdays for today
  const todaysBirthdays = useMemo(() => {
    if (!data.birthdays) return [];
    return data.birthdays.filter((b) => b.active && isBirthdayToday(b.dob, data.simulatedDate));
  }, [data.birthdays, data.simulatedDate]);

  // Compute upcoming birthdays (within next 7 days)
  const upcomingBirthdays = useMemo(() => {
    if (!data.birthdays) return [];
    return data.birthdays.filter(
      (b) => b.active && !isBirthdayToday(b.dob, data.simulatedDate) && isBirthdayUpcoming(b.dob, 7, data.simulatedDate)
    );
  }, [data.birthdays, data.simulatedDate]);

  return {
    ...data,
    todaysBirthdays,
    upcomingBirthdays,
    store: schoolStore
  };
}
