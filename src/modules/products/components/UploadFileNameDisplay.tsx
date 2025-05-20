'use client';

import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui';

type Props = {
  fileName?: string;
};

const splitFileName = (fullName: string, tailLen: number = 10) => {
  if (fullName.length <= tailLen * 2 + 3) return { head: fullName, tail: '' };

  return {
    head: fullName.slice(0, fullName.length - tailLen),
    tail: fullName.slice(-tailLen),
  };
};

const UploadFileNameDisplay: React.FC<Props> = ({ fileName }) => {
  const { head, tail } = fileName
    ? splitFileName(fileName)
    : { head: 'No file chosen', tail: '' };
  const fullFileName = fileName || 'No file chosen';

  const inputClassNames = `
    w-full min-w-0 h-9 px-3 py-1 inline-flex items-center
    border border-input rounded-md shadow-xs transition-[color,box-shadow]
    bg-transparent dark:bg-input/30 text-base text-sm whitespace-nowrap
    focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none
  `;

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {tail && (
        <p className="absolute bottom-full italic text-[0.6rem] text-muted-foreground ml-1">
          Hover to view full name
        </p>
      )}
      <HoverCard>
        <HoverCardTrigger asChild>
          <div className={inputClassNames}>
            <span className="overflow-hidden text-ellipsis">{head}</span>
            <span>{tail}</span>
          </div>
        </HoverCardTrigger>
        {tail && (
          <HoverCardContent className="w-full max-w-screen text-sm">
            {fullFileName}
          </HoverCardContent>
        )}
      </HoverCard>
    </div>
  );
};

export default UploadFileNameDisplay;
