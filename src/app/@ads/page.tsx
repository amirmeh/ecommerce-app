import {
  Button,
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui';
import Image from 'next/image';

const Ads = () => {
  return (
    <Card className="w-3/4 flex flex-row justify-between items-center">
      <div>
        <CardHeader>
          <CardTitle>On Sale Products</CardTitle>
          <CardDescription>
            Buy outdated products with 50% discount
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button>Buy Now</Button>
        </CardFooter>
      </div>
      <div>
        <Image
          src="/assets/ads.jpg"
          width={980}
          height={622}
          alt="ads"
          className="rounded-tr-lg rounded-br-lg"
        />
      </div>
    </Card>
  );
};

export default Ads;
