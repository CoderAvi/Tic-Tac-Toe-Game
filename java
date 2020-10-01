import java.util.*;
public class TTT {
	static int flush;
	public static void main(String[] args) { // room to add option for choosing pvp or pvc if pvc is implemented in future
		Scanner sc = new Scanner(System.in);
		System.out.print("Flush Screen after each turn (Y/N)? ");
		flush = sc.next().toUpperCase().contains("Y")? 100:1;
		pvp();	
	}
	private static void pvp(){
		String [] el = new String [9];
		for (int i = 0;i<9;i++){
			el[i] = i+1+"";
		}
		Scanner sc = new Scanner (System.in);
		System.out.print("Enter player 1 name: ");
		String p1 = sc.nextLine();
		System.out.print("Enter player 2 name: ");
		String p2 = sc.nextLine();
		boolean p1t = true;	// true = player1's turn, false = player2's turn
		boolean game = true;	// true = game not over
		int c = 0;		// no of turns played
		while(game){
			disp(el);	// Display board
			c++;		// Increase no of turns by 1
			if(c>el.length){	// If 9 turns are taken, and no one has won, game is draw
				game = false;
				System.out.println("\nDraw!");
				break;
			}
			int choice = inp((p1t)?p1:p2);	// Take player's turn input
			if (!Character.isDigit(el[choice-1].charAt(0))){	// If inputed position already contains X or O
				System.out.println("Invalid Move");
				continue;
			}
			el[choice-1] = (p1t)?"X":"O";	// Insert X or O in chosen position
			if(won(el)){	// If the player made a winning move
				game = false;
				disp(el);	// Display board after putting last move
				System.out.println("\n\n"+((p1t)?p1:p2)+" won the game!");
				break;
			}	
			p1t = !p1t;
		}	
	}
	private static boolean won(String[] el) {	// Check if in current board state anyone has won
		for(int i =0;i<3;i++)		if(el[i].equals(el[i+3])&&el[i].equals(el[i+6]))	return true;	// Same column checking
		for(int i =0;i<9;i+=3)		if(el[i].equals(el[i+1])&&el[i].equals(el[i+2]))	return true;	// Same row checking
		for(int i =0,b=4;i<3;i+=2,b-=2)	if(el[i].equals(el[i+b])&&el[i].equals(el[i+b+b]))	return true;	// Diagonal Checking
		return false;	
	}
	private static int inp(String p) {	// Input user's turn
		Scanner sc = new Scanner (System.in);
		System.out.print("\n\n"+p+" enter your move: ");
		int choice = sc.nextInt();
		if(choice>9||choice < 1){	// Board is 3x3 so input can be 1-9
			System.out.println("Invalid Input");
			choice = inp(p);
		}
		return choice;
	}
	private static void disp(String[] el){
		for(int i = 0; i < flush;i++)	System.out.println(); // Flush screen
		for(int i =0;i<el.length;i++){
			System.out.print(el[i]);
			if(i == el.length -1) break;
			if((i+1)%3==0)
				System.out.print("\n--+---+--\n");
			else
				System.out.print(" | ");	
		}
	}
}
