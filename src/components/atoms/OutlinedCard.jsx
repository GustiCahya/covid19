import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import PhoneIcon from '@material-ui/icons/Phone';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    // minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  phone: {
    display: "flex",
    alignItems: "center",
    color: "#5f74cd"
  }
});

export default function OutlinedCard({name, address, region, phone}) {
  const classes = useStyles();
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {address}
        </Typography>
        <Typography variant="h5" component="h2">
          {name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {region}
        </Typography>
        <Typography variant="body2" component="p">
          {phone}
        </Typography>
      </CardContent>
      <CardActions>
        <a className={classes.phone} href={"tel:"+phone}>
          <PhoneIcon />
          <span>Telepon</span>
        </a>
      </CardActions>
    </Card>
  );
}