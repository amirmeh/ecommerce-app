import { LoaderCircle } from 'lucide-react';

interface SpinnerProps {
  size?: string;
  className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = '',
  className = '',
}) => {
  return (
    <div className={`flex flex-col justify-center items-center ${className}`}>
      <LoaderCircle
        style={{ width: `${size}`, height: `${size}` }}
        className="animate-spin"
      />
    </div>
  );
};
