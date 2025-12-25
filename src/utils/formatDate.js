import { format } from 'date-fns';
import { id } from 'date-fns/locale';

export const formatDate = (dateString, pattern = 'dd MMMM yyyy') => {
  if (!dateString) return '-';
  try {
    return format(new Date(dateString), pattern, { locale: id });
  } catch (error) {
    return dateString;
  }
};