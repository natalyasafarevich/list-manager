import BoardPage from '@/components/pages/BoardPage/BoardPage';
import {getDefaultData} from '@/helper/getFirebaseData';
import {meta_desc} from '@/variables/metadata';
import type {Metadata, ResolvingMetadata} from 'next';

type Props = {
  params: {id: string};
};

export async function generateMetadata({params}: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const id = params.id;
  const product = await getDefaultData(`boards/${id}`);
  const previousImages = (await parent).openGraph?.images || [];

  const desc = product?.description.replace(/<[^>]*>/g, '');
  return {
    title: {absolute: product?.name},
    description: desc || meta_desc,
    openGraph: {
      images: [
        {
          url: product.currentBg,
          width: 800,
          height: 600,
          alt: 'Preview Image',
        },
        ...previousImages,
      ],
    },
  };
}

export default function Page() {
  return (
    <>
      <BoardPage />
    </>
  );
}
