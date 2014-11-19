import java.awt.BorderLayout;

import javax.swing.JFrame;

public class MainApp extends JFrame implements AddTermListener {

	ScalePanel sp;
	PartBin pb;

	public MainApp() {
		setLayout(new BorderLayout());
		sp = new ScalePanel();
		pb = new PartBin(this);
		add(new MenuBar(), BorderLayout.NORTH);
		add(sp, BorderLayout.CENTER);
		add(pb, BorderLayout.EAST);
		setDefaultCloseOperation(EXIT_ON_CLOSE);
		pack();
		setVisible(true);
	}

	@Override
	public void addX() {
		sp.addX();
	}

	@Override
	public void addConstant() {
		sp.addConstant();
	}

	public static void main(String[] args) {

		new MainApp();
	}
}
