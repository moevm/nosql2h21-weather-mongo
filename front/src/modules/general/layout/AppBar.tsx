import React, {useState} from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import {useNavigate} from "react-router";

const pages = ['Главная старница',  'Администрирование'];

const ResponsiveAppBar = () => {
	const navigate = useNavigate();
	const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);


	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleClick = (page: string, event: React.MouseEvent<HTMLElement>) => {
		if(page === 'Главная старница'){
			navigate('/')
		}else if(page === 'Администрирование'){
			navigate('/admin')
		}
	};

	return (
		<AppBar position="static">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<Typography
						variant="h6"
						noWrap
						component="div"
					>
						ПОГОДА
					</Typography>

					<Box >
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left',
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: 'block', md: 'block' },
							}}
						>
							{pages.map((page) => (
								<MenuItem key={page} onClick={handleCloseNavMenu}>
									<Typography textAlign="center">{page}</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
					<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}>
						{pages.map((page) => (
							<Button
								key={page}
								onClick={(event) => handleClick(page, event)}
								sx={{ my: 2, color: 'white', display: 'block' }}
							>
								{page}
							</Button>
						))}
					</Box>

				</Toolbar>
			</Container>
		</AppBar>
	);
};
export default ResponsiveAppBar;
