import { Clear, Search } from "@mui/icons-material";
import {
  Button,
  Divider,
  IconButton,
  LinearProgress,
  TextField,
  Typography
} from "@mui/material";
import { useEffect, useState } from "react";
import { getFromLS, getName, getRanking, saveToLS } from "../../services";

const Home = () => {
  const [name, setName] = useState("");
  const [searchName, setSearchName] = useState("");
  const [ranking, setRanking] = useState([]);
  const [results, setResults] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const data = await getRanking();
      setRanking(data);
    };
    getData();
  }, []);

  const saveNamesToLS = (name) => {
    // array --> searchNames
    const searchNames = getFromLS("searchNames") || [];
    searchNames.push(name);
    saveToLS("searchNames", searchNames);
  }

  const handleClick = async () => {
    const newName = name.replaceAll(" ", "");
    setSearchName(newName);
    // funcao pra lidar com um array de nomes
    saveNamesToLS(newName);
    const data = await getName(newName);
    setResults(data);
  };
  
  const formatNumber = (number) => new Intl.NumberFormat().format(number);
  
  const calculateXaras = () => {
    const total = results.reduce((result, item) => result + item.frequencia, 0);
    return total
  };

  const calculatePercentage = (frequencia) => {
    const total = (1 - (calculateXaras() / frequencia)) * 100;
    return total;
  }


  return (
    <div>
      <h1>Originômetro</h1>
      <h3>Veja o quao original é seu primeiro nome</h3>
      <div
        style={{
          margin: "20px",
          display: "flex",
          gap: "10px",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TextField
          label="Nome"
          variant="standard"
          value={name}
          onChange={(e) => setName(e.target.value)}
          InputProps={{
            endAdornment: (
              <IconButton onClick={() => setName("")}>
                <Clear />
              </IconButton>
            ),
          }}
        />
        <Button onClick={handleClick} variant="contained" endIcon={<Search />}>
          Buscar
        </Button>
      </div>
      {results && results.length === 0 && (
        <Typography>PARABÉNS! VOCÊ TEM O NOME MAIS ORIGINAL DO BRASIL</Typography>
      )}
      {results && results.length > 0 && (
        <div>
          <Divider>Resultado</Divider>
          <Typography>
            {searchName}, você tem {formatNumber(calculateXaras())} xarás
          </Typography>

          <div>
            {ranking.map(({ nome, frequencia }, index) => (
              <div key={index}>
                <Typography>Você é {calculatePercentage(frequencia).toFixed(2)}% mais original que {nome}</Typography>
                <LinearProgress value={calculatePercentage(frequencia)} variant="determinate" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export { Home };
