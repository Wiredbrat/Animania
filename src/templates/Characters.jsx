import { Card, useApi} from '../Importer';
import { Link } from 'react-router';

function Characters({charId}) {
  const {data} = useApi(`https://api.jikan.moe/v4/anime/${charId}/characters`)
  const charactersData = data
  return (
    <div className='flex flex-wrap gap-x-3 gap-y-4 justify-center'>
      {charactersData.map((character) => {
        return (
          <div key={character.character?.mal_id} className='flex flex-col gap-y-1 text-white hover:scale-105 duration-300 w-[110px] md:w-[200px]'>
          <Link to={character.character?.url} target='_blank'>
          <Card
          tags={character.role}
          id={character.character?.mal_id}
          bgImage={character.character?.images?.webp?.image_url} 
          height={"h-[150px] sm:h-[300px]"}
          width={"w-[110px] sm:w-[200px]"}
          // title={character.character?.name}
          />

          <p className='text-[12px] md:text-base line-clamp-1'>
            {character.character?.name}
          </p>
          </Link>
          </div>
        )
      })}
    </div>
  )
}

export default Characters