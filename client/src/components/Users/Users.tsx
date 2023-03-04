import React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useUsers } from "../hooks/useUsers";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { useAuth } from "../hooks/useAuth";

export const Users = () => {
  const users = useSelector((state: RootState) => state.allUsers.user);

  const { authUser } = useAuth();

  const { fetchUsers } = useUsers();
  useEffect(() => {
    authUser();
  }, []);
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 320 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Імʼя</TableCell>
              <TableCell align="right">Фамілія</TableCell>
              <TableCell align="right">Нікнейм</TableCell>
              <TableCell align="right">E-mail</TableCell>
              <TableCell align="right">Назва організації</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {user._id}
                </TableCell>
                <TableCell align="right">{user.firstname}</TableCell>
                <TableCell align="right">{user.lastname}</TableCell>
                <TableCell align="right">{user.nickname}</TableCell>
                <TableCell align="right">{user.email}</TableCell>
                <TableCell align="right">{user.organizationName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
