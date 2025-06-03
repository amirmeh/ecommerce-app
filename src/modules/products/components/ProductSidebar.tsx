import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
  Sidebar,
  SidebarProvider,
  SidebarMenu,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from '@/components/ui';
import { ChevronRight } from 'lucide-react';

import ProductSearchInput from './ProductSearchInput';
import SortSelector from './filters/SortSelector';
import FilterPanel from './filters/FilterPanel';

type Props = {
  onSearch: (q: string) => void;
  onSort: (value: string) => void;
  sort: string;
  onApplyFilters: (f: {
    categories: string[];
    minPrice: number;
    maxPrice: number;
  }) => void;
  categories: string[];
};

export default function ProductSidebar({
  onSearch,
  onSort,
  sort,
  onApplyFilters,
  categories,
}: Props) {
  return (
    <SidebarProvider>
      <Sidebar className="sticky top-22 h-fit rounded-md border overflow-hidden">
        <SidebarContent>
          <SidebarMenu className="space-y-0 gap-0">
            {/* Search */}
            <SidebarGroup className="border-b p-0">
              <Collapsible defaultOpen>
                <CollapsibleTrigger asChild>
                  <SidebarGroupLabel className="group flex justify-between items-center cursor-pointer text-md text-sidebar-foreground/100 rounded-none hover:bg-muted">
                    Search
                    <ChevronRight className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-90" />
                  </SidebarGroupLabel>
                </CollapsibleTrigger>

                <SidebarGroupContent>
                  <CollapsibleContent>
                    <div className="p-2">
                      <ProductSearchInput onSearch={onSearch} />
                    </div>
                  </CollapsibleContent>
                </SidebarGroupContent>
              </Collapsible>
            </SidebarGroup>

            {/* Sort */}
            <SidebarGroup className="border-b p-0">
              <Collapsible defaultOpen>
                <CollapsibleTrigger asChild>
                  <SidebarGroupLabel className="group flex justify-between cursor-pointer text-md text-sidebar-foreground/100 rounded-none hover:bg-muted">
                    Sort
                    <ChevronRight className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-90" />
                  </SidebarGroupLabel>
                </CollapsibleTrigger>

                <SidebarGroupContent>
                  <CollapsibleContent>
                    <div className="p-2">
                      <SortSelector value={sort} onChange={onSort} />
                    </div>
                  </CollapsibleContent>
                </SidebarGroupContent>
              </Collapsible>
            </SidebarGroup>

            {/* Filters */}
            <SidebarGroup className="p-0">
              <Collapsible>
                <CollapsibleTrigger asChild>
                  <SidebarGroupLabel className="group flex justify-between items-center cursor-pointer text-md text-sidebar-foreground/100 rounded-none hover:bg-muted">
                    Filters
                    <ChevronRight className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-90" />
                  </SidebarGroupLabel>
                </CollapsibleTrigger>

                <SidebarGroupContent>
                  <CollapsibleContent>
                    <div className="p-2">
                      <FilterPanel
                        onApply={onApplyFilters}
                        categories={categories}
                      />
                    </div>
                  </CollapsibleContent>
                </SidebarGroupContent>
              </Collapsible>
            </SidebarGroup>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
}
