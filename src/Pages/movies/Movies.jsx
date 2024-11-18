
import {Container, Heading, Grid, Skeleton, Select, Flex } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { fetchMovies } from "../../services/Api";
import CardComponent from "../../components/CardComponent";
import PaginationComponent from "../../components/PaginationComponent";


const Movies = () => {
  
  const [movies, setMovies] = useState([]);
  const [activePage, setActivePage] =  useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState("popularity.desc")
  const [isloading, setIsLoading] = useState(true);


  useEffect(() => {
    setIsLoading(true);
    fetchMovies(activePage, sortBy)
      .then((res) => {
        console.log(res, "res");
        setMovies(res?.results);
        setActivePage(res?.page);
        setTotalPages(res?.total_pages);
      })
      .catch((err) => console.log(err, "err"))
      .finally(() => setIsLoading(false));
  }, [activePage, sortBy]);

  return (
    <Container maxW={"container.xl"}>
    <Flex alignItems={'baseline'} gap={'4'} my='10'>
      <Heading as="h2" fontSize={"md"} textTransform={"uppercase"}>
      Movies
      </Heading>
    
    <Select
    fontWeight={"bold"}
    color={"black"}
    bg='pink.500'
    cursor={'pointer'}  
    borderColor='black' 
    variant='outline' 
    w={'130px'} 
    onChange={(e) => {
      setActivePage(1)
      setSortBy(e.target.value)
    }}>
      <option value="popularity.desc">Popular</option>
      <option value="vote_average.desc&vote_count.gte=1000">Top Rated</option>
    </Select>
    </Flex>
    
      <Grid templateColumns={{
      base: "1fr",
      sm: 'repeat(2, 1fr)',
      md: 'repeat(4, 1fr)',
      lg: 'repeat(5, 1fr)'
    }} gap={"4"}>
      {movies && 
      movies?.map((item, index) =>   
        isloading ? (
          <Skeleton height={300} key={index}/>
        ) : (
          <CardComponent
          key={item?.id} 
          item={item} 
          type={'movie'}
          />
        )
      )}
    </Grid>
    <PaginationComponent
        activePage={activePage}
        totalPages={totalPages} 
        setActivePage={setActivePage}/>
  </Container>

  )
}

export default Movies