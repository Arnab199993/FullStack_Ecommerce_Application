import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Link,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useState } from "react";
import { useProductContext } from "../Context/ProductContext";
import { useNavigate } from "react-router-dom";
// const BASE_URL = "http://localhost:5000";
const BASE_URL = "https://fullstack-ecommerce-application.onrender.com";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${theme.breakpoints.down("md")}`]: {
    fontSize: 12,
  },
  [`&.${theme.breakpoints.up("md")}`]: {
    fontSize: 14,
  },
  [`&.${theme.breakpoints.up("lg")}`]: {
    fontSize: 16,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Product = () => {
  const { product, setProduct } = useProductContext();
  const navigate = useNavigate();
  console.log("producttt", product);

  const storedData = localStorage.getItem("token");

  const fetchData = async () => {
    try {
      const res = await fetch(`${BASE_URL}/productsList`, {
        headers: {
          authorization: `bearer ${storedData}`,
        },
      });
      const data = await res.json();
      if (data?.length > 0) {
        setProduct(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    console.log("handleDeleteee");
    const userConfimation = window.confirm("Do you want to delete");
    console.log("userConfimationnnn", userConfimation);
    try {
      if (userConfimation) {
        let result = await fetch(`${BASE_URL}/product/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${localStorage.getItem("token")}`,
          },
        });
        if (result.ok) {
          result = await result.json();
          fetchData();
        } else {
          console.log("Delete operation failed");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleEdit = (id) => {
    navigate(`/update/${id}`);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Sl No.</StyledTableCell>
            <StyledTableCell align="right">Name</StyledTableCell>
            <StyledTableCell align="right">Company</StyledTableCell>
            <StyledTableCell align="right">Category</StyledTableCell>
            <StyledTableCell align="right">Price</StyledTableCell>
            <StyledTableCell align="right">Operation</StyledTableCell>
            <StyledTableCell align="right">Photos</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {product.map((row, i) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {i + 1}
              </StyledTableCell>
              <StyledTableCell align="right">{row.name}</StyledTableCell>
              <StyledTableCell align="right">{row.company}</StyledTableCell>
              <StyledTableCell align="right">{row.category}</StyledTableCell>
              <StyledTableCell align="right">{row.price}</StyledTableCell>
              <StyledTableCell align="right">
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDelete(row._id)}
                >
                  <DeleteIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="edit"
                  onClick={() => handleEdit(row._id)}
                >
                  <EditIcon />
                </IconButton>
              </StyledTableCell>
              <StyledTableCell align="right">
                <img
                  key={row?._id}
                  src={`${BASE_URL}/${row?.files}`}
                  alt={row?.files}
                  height={40}
                  width={40}
                />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Product;
