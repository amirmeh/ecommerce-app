import { LoaderCircle } from 'lucide-react';

interface SpinnerProps {
  size?: number;
  className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = 48,
  className = '',
}) => {
  return (
    <div className={`flex flex-col justify-center items-center ${className}`}>
      <LoaderCircle size={size} className="animate-spin" />
    </div>
  );
};
