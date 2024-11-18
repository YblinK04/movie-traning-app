import { useEffect, useState } from "react"
import {Container, Heading, Flex, Input, Spinner, Grid, Skeleton } from "@chakra-ui/react"
import CardComponent from "../../components/CardComponent";
import { searchData } from "../../services/api";
import PaginationComponent from "../../components/PaginationComponent"

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [tempSearchValue, setTempSearchValue] = useState("")
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState ([]);
  const [totalPages, setTotalPages] = useState(1)
  

  useEffect(() => {
    setIsLoading(true);
    searchData(searchValue, activePage).
    then((res) => {
     console.log(res,'res');
     setData(res?.results);
     setActivePage(res?.page);
     setTotalPages(res?.totalPages)
    }).
    catch((err) => console.log(err, 'err'))
    .finally(() => setIsLoading(false))
  }, [searchValue, activePage])

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchValue(tempSearchValue);
  }
  
  
  return (
    <Container maxW={"container.xl"}>
    <Flex alignItems={"baseline"} gap={"4"} my={"10"} >
    <Heading as="h2" fontSize={"md"} textTransform={"uppercase"}  >
      Search
      </Heading>
      </Flex>

      <form onSubmit={handleSearch}>
        <Input 
        placeholder="Search your movie, tv series or tv shows..." 
        value={tempSearchValue}
        onChange={(e)=> setTempSearchValue(e.target.value)}
        borderColor={"pink.900"}
        focusBorderColor="pink.700"
        _hover={""}
         />
      </form>

      {isLoading && (
        <Flex justifyContent={"center"} mt="10" >
          <Spinner size={"xl"} color="pink.500"></Spinner>
        </Flex>

      )}

      {data?.length == 0 && !isLoading && (
        <Heading 
        textAlign={"center"} 
        as="h3" 
        fontSize={"sm"} 
        mt="10"
        >
          No results found
        </Heading>
      )}
        <Grid templateColumns={{
      base: "1fr",
      sm: 'repeat(2, 1fr)',
      md: 'repeat(4, 1fr)',
      lg: 'repeat(5, 1fr)'
    }} gap={"4"}
    mt="6">
      {data?.length > 0 && !isLoading && 
      data?.map((item, index) =>   
        isLoading ? (
          <Skeleton height={300} key={index}/>
        ) : (
          <CardComponent key={item?.id} 
          item={item} 
          type={item?.media_type}
          />
        )
      )}
    </Grid>

  
  {data?.length > 0 && !isLoading && (
     <PaginationComponent 
     activePage={activePage}
     totalPages={totalPages} 
     setActivePage={setActivePage}/>
  
  )}
    </Container>

  );
};

export default Search