// 'use client';

// import Link from 'next/link';
// import {
//   Button,
//   NavigationMenu,
//   NavigationMenuContent,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
//   NavigationMenuTrigger,
//   navigationMenuTriggerStyle,
// } from '../ui';
// import { cn } from '@/lib/utils';
// import { useState } from 'react';

// const NavMenu = () => {
//   const categories = [
//     'Mobile',
//     'Laptop',
//     'Home Accessories',
//     'Display',
//   ] as const;
//   type Category = (typeof categories)[number];

//   const subCategories: Record<Category, string[]> = {
//     Mobile: ['Apple', 'Samsung', 'Huawei'],
//     Laptop: ['Macbook', 'Asus'],
//     'Home Accessories': ['Fridge', 'Oven'],
//     Display: ['XDR', 'Studio'],
//   };

//   const [selectedCategory, setSelectedCategory] = useState<Category>('Mobile');

//   const buttonHeight = 2.25;
//   const totalHeight = buttonHeight * categories.length;

//   return (
//     <NavigationMenu>
//       <NavigationMenuList className="gap-3">
//         <NavigationMenuItem>
//           <NavigationMenuTrigger className="border">
//             Categories
//           </NavigationMenuTrigger>
//           <NavigationMenuContent className="p-0">
//             <div style={{ height: `${totalHeight}rem` }} className="flex">

//               {/* Main Categories | Left Column */}
//               <div className="flex flex-col border-r whitespace-nowrap">
//                 {categories.map((category) => (
//                   <Button
//                     variant="ghost"
//                     key={category}
//                     className="w-full justify-start text-left px-4.5 py-2 border-b last:border-b-0 rounded-none"
//                     onMouseEnter={() => setSelectedCategory(category)}
//                   >
//                     {category}
//                   </Button>
//                 ))}
//               </div>

//               {/* Sub Categories | Right Column */}
//               <div className="flex flex-col overflow-y-auto p-4 gap-3">
//                 {subCategories[selectedCategory].map((sub) => (
//                   <div key={sub} className="border px-4.5 py-2">
//                     {sub}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </NavigationMenuContent>
//         </NavigationMenuItem>
//         <NavigationMenuItem>
//           <NavigationMenuLink asChild>
//             <Link
//               href="/contact"
//               className={cn(navigationMenuTriggerStyle(), 'border')}
//             >
//               Contact Us
//             </Link>
//           </NavigationMenuLink>
//         </NavigationMenuItem>
//       </NavigationMenuList>
//     </NavigationMenu>
//   );
// };

// export default NavMenu;

'use client';

import Link from 'next/link';
import {
  Button,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '../ui';
import { cn } from '@/lib/utils';

const NavMenu = () => {
  const categories = {
    Mobile: '/products?category=MOBILE',
    Laptop: '/products?category=LAPTOP',
    Watch: '/products?category=WATCH',
    Other: '/products?category=OTHER',
  };

  const buttonHeight = 2.25;
  const totalHeight = buttonHeight * Object.keys(categories).length;

  return (
    <NavigationMenu>
      <NavigationMenuList className="gap-3">
        <NavigationMenuItem>
          <NavigationMenuTrigger className="border">
            Categories
          </NavigationMenuTrigger>
          <NavigationMenuContent className="p-0">
            <div style={{ height: `${totalHeight}rem` }} className="flex">
              {/* Main Categories | Left Column */}
              <div className="flex flex-col border-r whitespace-nowrap">
                {Object.entries(categories).map(([cat, link]) => (
                  <Link href={link} key={cat}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-left px-4.5 py-2 border-b last:border-b-0 rounded-none cursor-pointer"
                    >
                      {cat}
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              href="/contact"
              className={cn(navigationMenuTriggerStyle(), 'border')}
            >
              Contact Us
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavMenu;
