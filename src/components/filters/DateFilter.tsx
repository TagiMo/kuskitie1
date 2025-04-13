
import { Calendar as CalendarIcon, CalendarRange, CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { fi } from 'date-fns/locale';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DateFilterProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  dateRange: 'day' | 'week' | 'month';
  setDateRange: (range: 'day' | 'week' | 'month') => void;
}

const DateFilter = ({ date, setDate, dateRange, setDateRange }: DateFilterProps) => {
  return (
    <div className="flex gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal filter-input",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP", { locale: fi }) : <span>Valitse päivämäärä</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 z-50 bg-white" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
            locale={fi}
          />
        </PopoverContent>
      </Popover>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="filter-input w-[110px] flex-shrink-0">
            {dateRange === 'day' && <CalendarIcon className="mr-2 h-4 w-4" />}
            {dateRange === 'week' && <CalendarRange className="mr-2 h-4 w-4" />}
            {dateRange === 'month' && <CalendarDays className="mr-2 h-4 w-4" />}
            {dateRange === 'day' && 'Päivä'}
            {dateRange === 'week' && 'Viikko'}
            {dateRange === 'month' && 'Kuukausi'}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-white">
          <DropdownMenuItem onClick={() => setDateRange('day')}>
            <CalendarIcon className="mr-2 h-4 w-4" />
            <span>Päivä</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setDateRange('week')}>
            <CalendarRange className="mr-2 h-4 w-4" />
            <span>Viikko</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setDateRange('month')}>
            <CalendarDays className="mr-2 h-4 w-4" />
            <span>Kuukausi</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DateFilter;
