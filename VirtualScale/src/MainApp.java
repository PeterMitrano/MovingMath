import java.awt.BorderLayout;

import javax.swing.JFrame;

public class MainApp extends JFrame {

	ScalePanel sp;
	SidePanel pb;

	public MainApp() {
		setLayout(new BorderLayout());
		sp = new ScalePanel();
		pb = new SidePanel(sp, sp);
		add(new MenuBar(), BorderLayout.NORTH);
		add(sp, BorderLayout.CENTER);
		add(pb, BorderLayout.EAST);
		setDefaultCloseOperation(EXIT_ON_CLOSE);
		pack();
		setVisible(true);
	}

	public static void main(String[] args) {

		new MainApp();
	}

}
